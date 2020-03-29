import React from "react";

const Input = ({ name, type, label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
      />
      {error && <label className="text-danger">{error}</label>}
    </div>
  );
};

export default Input;
