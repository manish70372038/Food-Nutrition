import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Upload,
  Brain,
  Apple,
  LogIn,
  UserCircle,
} from "lucide-react";
import "./Navbar.css";

const Navbar = ({ user }) => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "active-link" : "";

  return (
    <nav className="navbar">
      <h2 className="logo">
        🍎 Food Nutrition AI
      </h2>

      <ul className="nav-menu">
        <li>
          <Link to="/" className={isActive("/")}>
            <Home size={18} /> Home
          </Link>
        </li>

        <li>
          <Link to="/dashboard" className={isActive("/dashbord")}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
        </li>

        <li>
          <Link to="/upload" className={isActive("/upload")}>
            <Upload size={18} /> Upload Image
          </Link>
        </li>

        <li>
          <Link to="/predict" className={isActive("/predict")}>
            <Brain size={18} /> Predict
          </Link>
        </li>

        <li>
          <Link to="/nutrition" className={isActive("/nutrition")}>
            <Apple size={18} /> Nutrition
          </Link>
        </li>

        {/* AUTH SECTION */}
        {user ? (
          <li>
            <Link to="/profile" className={isActive("/profile")}>
              <UserCircle size={20} /> {user.name || "Profile"}
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login" className={isActive("/login")}>
              <LogIn size={18} /> Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;