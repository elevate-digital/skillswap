import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};

export function Input({ label, className = "", type = "text", ...props }: InputProps) {
  return (
    <label className={`flex flex-col gap-2 w-[100%] ${className}`}>
      {label && <span>{label}</span>}

      <input type={type} {...props} className={`bg-[var(--third-bg-color)] py-[12px] px-[16px] sm:py-[12px] sm:px-[32px] rounded-lg`} />
    </label>
  );
}