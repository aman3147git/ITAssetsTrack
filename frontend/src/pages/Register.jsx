import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaLockOpen } from "react-icons/fa";
import axiosInstance from "../axios.js";

const Register = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });
  const [passtype, setPasstype] = useState("password");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      await axiosInstance.post(`/user/register`, formdata, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
  <div className="bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] min-h-screen flex justify-center items-center px-4 relative overflow-hidden">
  
 
  <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
  <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>

  
  <div className="w-full max-w-lg relative z-10">
    
    
    <div className="flex flex-col items-center mb-12 text-center">
      <Link to="/">
        <h1 className="text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
          Asset<span className="text-green-500">Flow</span>
        </h1>
      </Link>
      <p className="text-gray-400 mt-4 text-lg italic">
        Effortless asset requests, redefined 
      </p>
      <h2 className="text-white font-bold text-3xl mt-8">
        Create Your Account
      </h2>
    </div>

    
    <form className="space-y-7" onSubmit={submitHandler}>
     
      <div>
        <input
          type="text"
          id="name"
          placeholder="Full Name"
          onChange={handlechange}
          value={formdata.name}
          className="w-full px-5 py-4 bg-white/5 backdrop-blur-lg text-white rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none transition"
        />
      </div>

      
      <div>
        <input
          type="email"
          id="email"
          placeholder="Email Address"
          onChange={handlechange}
          value={formdata.email}
          className="w-full px-5 py-4 bg-white/5 backdrop-blur-lg text-white rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none transition"
        />
      </div>

      
      <div className="relative">
        <input
          type={passtype}
          id="password"
          placeholder="Enter a strong password"
          onChange={handlechange}
          value={formdata.password}
          className="w-full px-5 py-4 bg-white/5 backdrop-blur-lg text-white rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none transition"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-green-400 text-xl"
          onClick={() => setPasstype(passtype === "password" ? "text" : "password")}
        >
          {passtype === "password" ? <FaLock /> : <FaLockOpen />}
        </button>
      </div>

      
      <div>
        <select
          id="role"
          onChange={handlechange}
          value={formdata.role}
          className="w-full px-5 py-4 bg-white/5 backdrop-blur-lg text-white rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none transition"
        >
          <option value="employee" className="bg-black">Employee</option>
          <option value="manager" className="bg-black">Manager</option>
        </select>
      </div>

      
      <div className="space-y-4">
        <button
          disabled={loader}
          className="w-full text-black font-bold py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-400 hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-lg"
        >
          {loader ? "Creating Account..." : "Sign Up"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full text-gray-300 font-semibold py-4 bg-transparent rounded-xl border border-gray-600 hover:border-green-400 hover:text-green-400 transition"
        >
          Already have an account? <span className="text-sm text-red-600 hover:underline">SignIn</span>
        </button>
      </div>
    </form>
  </div>
</div>

);
}
export default Register;
