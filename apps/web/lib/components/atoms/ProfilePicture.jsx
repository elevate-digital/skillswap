import React from "react";

export function ProfilePicture({ name }) {
    return (
      <p className="w-[45px] h-[45px] rounded-full bg-[var(--primary-highlight-color)] flex items-center justify-center !text-[var(--secondary-text-color)] !font-[var(--font-weight-m)]">{name}</p>
    );
  };
  
  export default ProfilePicture;
  