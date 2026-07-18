import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header
      className="d-flex justify-content-between align-items-center px-4 py-2"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e0e6eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <div className="fw-bold" style={{ fontSize: "1.2rem" }}>
        IELS SSO
      </div>

      <nav className="d-flex gap-3">
        <Link to="/" className="text-decoration-none text-dark">
          Login
        </Link>
        <Link to="/register" className="text-decoration-none text-dark">
          Register
        </Link>
      </nav>
    </header>
  );
}
