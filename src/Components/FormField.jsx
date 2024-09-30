// FormField.js
import React, { forwardRef } from "react";

const FormField = forwardRef(
  (
    { label, name, type = "text", handleBlur, handleChange, value, error },
    ref
  ) => (
    <div>
      <label>{label}</label>
      <input
        className="form-control"
        type={type}
        name={name}
        ref={ref}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
      />
      <span>{error}</span>
    </div>
  )
);

export default FormField;
