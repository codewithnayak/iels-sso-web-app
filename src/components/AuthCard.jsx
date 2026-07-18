import React from "react";

export default function AuthCard({ title, children }) {
  return (
    <div
      className="d-flex justify-content-center align-items-start pt-5"
      style={{ minHeight: "calc(100vh - 120px)", background: "#f0f4f8" }}
    >
      <div
        className="p-4 rounded shadow-sm"
        style={{
          width: "380px",
          background: "#fff",
          border: "1px solid #e0e6eb",
        }}
      >
        <h3 className="mb-4 text-center">{title}</h3>
        {children}
      </div>
    </div>
  );
}
