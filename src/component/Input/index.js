import React from 'react'

const input = ({
  label = "",
  id = "",
  name = "",
  type = "",
  className = "",
  placeholder = "",
  isRequired = true,
  value = "",
  onChange = () => {},
}) => {
  return (
    <div className="flex flex-row gap-6 py-4 items-center">
      <input
        type={type}
        id={id}
        name={name}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-blue-400 block ${className}`}
        placeholder={placeholder}
        required={isRequired}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={name} className="block text-sm lg:text-lg">
        {label}
      </label>
    </div>
  );
};

export default input
