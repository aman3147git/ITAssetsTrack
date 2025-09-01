
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { user } = useSelector((s) => s.auth);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      
    
      <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-700">
        Welcome, {user?.name || "User"} 👋
      </h1>
      <p className="text-gray-500 mb-10 text-lg max-w-xl">
        Role:{" "}
        <span className="font-semibold text-gray-800">{user?.role}</span>  
        <br />
        <span className="italic text-gray-600">
          "Every request you make is a step closer to progress"
        </span>
      </p>

      
      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          to="/request/new"
          className="px-8 py-4 rounded-full bg-black text-white font-semibold tracking-wide text-lg
          hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-xl"
        >
          ➕ Create New Request
        </Link>

        <Link
          to="/my-requests"
          className="px-8 py-4 rounded-full bg-white border border-gray-300 text-gray-800 font-semibold tracking-wide text-lg
          hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          📂 View My Requests
        </Link>
      </div>
    </div>
  );
}
