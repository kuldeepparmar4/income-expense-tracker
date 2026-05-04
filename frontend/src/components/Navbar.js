import React from "react";
import { FaWallet } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaWallet className="navbar-icon" />
        <span>FinTrack</span>
      </div>
      <p className="navbar-subtitle">Personal Finance Dashboard</p>
    </nav>
  );
}

export default Navbar;
