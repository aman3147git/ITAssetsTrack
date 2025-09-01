import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { setUser } from "../redux/authSlice";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout");
      dispatch(setUser(null));
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        <Link to="/" className="text-2xl font-bold tracking-wide">
          AssetFlow
        </Link>

        
        {user && (
          <nav className="hidden md:flex space-x-6 items-center">
            
           
            <div className="relative group inline-block">
             
              <button className="flex items-center gap-2 px-4 py-2 rounded-md  transition">
                <div className="flex items-center justify-center rounded-full bg-white border w-12 h-12 text-red-400 font-bold text-lg">
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </div>
              </button>

              
              <div
                className="absolute right-0 mt-2 w-48  border border-gray-200 rounded-xl shadow-xl
    opacity-0 scale-95 
    group-hover:opacity-100 group-hover:scale-100 
    transition-all duration-200 origin-top-right z-50"
              >
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-950 transition-colors duration-150"
                >
                  <span>👤</span> Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-md text-gray-700 hover:text-red-600 transition-colors duration-150"
                >
                Logout
                </button>
              </div>
            </div>
          </nav>
        )}

        
        {user && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        )}
      </div>

     
      {menuOpen && user && (
        <nav className="md:hidden bg-gray-800 px-6 py-4 space-y-3">
          
          <Link
            to="/profile"
            className="block hover:text-yellow-300"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left hover:text-yellow-300"
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}
