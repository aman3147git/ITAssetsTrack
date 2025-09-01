import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { useSelector } from "react-redux";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateRequest from "./pages/CreateRequest.jsx";
import MyRequests from "./pages/MyRequests.jsx";
import ManagerDashboard from "./pages/ManagerDashboard.jsx";

export default function App() {
  const { user } = useSelector((s) => s.auth);
 
  return (
    <BrowserRouter>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />

        
        <Route
          path="/"
          element={
            user?.role === "employee" ? (
              <Dashboard />
            ) : user?.role === "manager" ? (
              <Navigate to="/manager" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/request/new"
          element={
            user?.role === "employee" ? (
              <CreateRequest />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/my-requests"
          element={
            user?.role === "employee" ? (
              <MyRequests />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        
        <Route
          path="/manager"
          element={
            user?.role === "manager" ? (
              <ManagerDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
