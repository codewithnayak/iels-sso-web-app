import React from "react";

export default function Footer() {
  return (
    <footer
      className="text-center py-3 mt-4"
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e0e6eb",
        fontSize: "0.9rem",
        color: "#6c757d",
      }}
    >
      © {new Date().getFullYear()} IELS — Secure SSO Login
    </footer>
  );
}
