import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {

  const [login, setLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg">
        {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin}/>}
      </div>
    </div>
  )
}

export default AuthPage