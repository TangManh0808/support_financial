// src/components/Input.jsx
import React from "react";

const Input = ({
  label,
  type = "text",
  name,
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-1 font-semibold">{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        {...register} // 👈 RẤT QUAN TRỌNG
        className={`w-full px-4 py-2 border rounded-lg outline-none transition-all duration-200
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }
          focus:ring-2`}
      />
    </div>
  );
};

export default Input;
