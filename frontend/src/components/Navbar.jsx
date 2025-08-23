import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav>
      <Link to="/">Dashboard</Link>
      {user?.role === "manager" && <Link to="/manager">Manager</Link>}
      <button onClick={() => dispatch(logout())}>Logout</button>
    </nav>
  );
}
