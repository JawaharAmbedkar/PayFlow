import { useState } from "react";

export const PasswordInput = ({
  label,
  placeholder,
  type = "text",
  onChange,
  value,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && !showPassword ? "password" : "text";

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                   focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />

      {/* Show / Hide Password Button */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-sm text-indigo-500 hover:underline"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
};
