import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Login payload:", form);
    alert("Login submitted (sample mode). Check console.");
  }

  return (
    <AuthCard title="Login">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            placeholder="officer@police.gov"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>

        <button className="btn btn-primary w-100 mt-2" type="submit">
          Login
        </button>

        <div className="text-center mt-3">
          <Link to="/register" className="text-decoration-none">
            Create an account
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
