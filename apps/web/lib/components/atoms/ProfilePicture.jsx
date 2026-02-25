"use client";
import React, { useEffect, useState } from "react";

export function ProfilePicture() {
  const [name, setName] = useState("");

  const loadUser = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setName(user.name);
    } else {
      setName("");
    }
  };

  useEffect(() => {
    loadUser(); // initial load

    // luister naar login/logout events
    window.addEventListener("auth-changed", loadUser);

    return () => window.removeEventListener("auth-changed", loadUser);
  }, []);

  if (!name) return null;

  const parts = name.trim().split(" ");
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  const initials = (first + last).toUpperCase();

  return (
    <p className="w-[45px] h-[45px] rounded-full bg-[var(--primary-highlight-color)] flex items-center justify-center !text-[var(--secondary-text-color)] !font-[var(--font-weight-m)]">
      {initials}
    </p>
  );
}

export default ProfilePicture;
