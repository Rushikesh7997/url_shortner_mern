import { nanoid } from "nanoid"
import { cookieOptions } from "../config/auth.config.js"
import jsonwebtoken from "jsonwebtoken"

export const generateNanoId = (length) =>{
    return nanoid(length)
}

export const signToken = (payload) =>{
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn:"1h"})
}

export const verifyToken = (token) =>{
    // return jsonwebtoken.verify(token, process.env.JWT_SECRET)
    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    console.log(decoded.id);
    return decoded.id;
}