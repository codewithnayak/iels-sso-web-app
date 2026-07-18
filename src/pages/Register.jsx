import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard.jsx";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Register payload:", form);
    alert("Registration submitted (sample mode). Check console.");
  }

  return (
    <AuthCard title="Create Account">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            placeholder="Officer Name"
          />
        </div>

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

        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            className="form-control"
            value={form.confirm}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>

        <button className="btn btn-primary w-100 mt-2" type="submit">
          Register
        </button>

        <div className="text-center mt-3">
          <Link to="/" className="text-decoration-none">
            Already have an account?
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
