import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailLoginPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!email) {
      setError("Email is required.");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else {
      setError(""); // Clear the error
      navigate("/user/quiz");
      console.log("Login with email:", email);
      // Add your login logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md bg-gray-900 shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-100 mb-6 text-center">
          Start with Email
        </h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default EmailLoginPage;
