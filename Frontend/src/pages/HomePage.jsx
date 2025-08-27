import React from "react";
import UrlForm from "../components/UrlForm";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center font-sans">
      <div className="w-full max-w-lg p-6 md:p-8 bg-gray-800 rounded-xl shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white mb-6">
          URL Shortener ✂️
        </h1>

        <UrlForm />
      </div>
    </div>
  );
};

export default HomePage;
