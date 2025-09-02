import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios.js";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/user/login", formData);

      
      dispatch(setUser(res.data.user));
      

      
      if (res.data.user.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]">
      <div className="w-full max-w-md px-8">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 drop-shadow-md">
          Login
        </h2>

        {error && (
          <p className="text-red-200 text-center mb-4 bg-red-600/30 py-2 rounded">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-5 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="w-full p-3 rounded-xl bg-white/80 focus:bg-white outline-none text-gray-700 placeholder-gray-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full p-3 rounded-xl bg-white/80 focus:bg-white outline-none text-gray-700 placeholder-gray-500"
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:opacity-90 transition"
          >
            Login
          </button>
          <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full text-gray-300 font-semibold py-4 bg-transparent rounded-xl border border-gray-600 hover:border-green-400 hover:text-green-400 transition"
        >
          Already have an account? <span className="text-sm text-red-600 hover:underline">SignUp</span>
        </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
