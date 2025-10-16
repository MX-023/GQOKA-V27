import React from "react";

export default function CertifiedBadge() {
  return (
    <div
      style={{
        position: "absolute",
        top: "8px",
        right: "8px",
        backgroundColor: "rgba(0, 128, 0, 0.85)",
        color: "white",
        padding: "6px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold",
        letterSpacing: "0.5px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      }}
    >
      ✅ Certifié GQOKA
    </div>
  );
}
