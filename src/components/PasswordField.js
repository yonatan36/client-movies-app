import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import Joi from "joi";

const passwordSchema = Joi.string()
  .pattern(
    new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{0,}$"
    )
  )
  .min(8)
  .max(15)
  .required();

const PasswordField = ({
  passwordRef,
  id = "password",
  label = "Password",
  name = "password"
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const { error } = passwordSchema.validate(value);
    setError(error ? error.message : "");
  };

  return (
    <TextField
      fullWidth
      id={id}
      label={label}
      type={showPassword ? "text" : "password"}
      inputRef={passwordRef}
      required
      name={name}
      error={!!error}
      helperText={error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={handleInputChange}
    />
  );
};

export default PasswordField;
