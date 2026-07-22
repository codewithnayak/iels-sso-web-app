import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard.jsx";
import { msalInstance } from "../services/identity/authConfig";
const url = import.meta.env.VITE_AZURE_RETURN_URL;
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLoginSSO = () => {
    const params = new URLSearchParams(window.location.search);
    const returnUrl = params.get("returnUrl") || url;
    console.log("setting up return url " + returnUrl);
    sessionStorage.setItem("returnUrl", returnUrl);

    msalInstance.loginRedirect({
      scopes: [
        "openid",
        "profile",
        "email",
        "api://442bbda6-535a-406d-818d-726ea77d53d0/.default",
      ],
    });
  };
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

      {/* DIVIDER */}
      <div className="text-center my-4 text-sm text-gray-500 font-medium">
        OR
      </div>
      <button
        className="btn btn-primary w-100 mt-2"
        type="submit"
        onClick={handleLoginSSO}
      >
        Login with SSO
      </button>
    </AuthCard>
  );
}
