import Joi from "joi";

export const LoginArray = [
  {
    label: "Email",
    name: "email",
    id: "email",
    type: "email",
    sm: 12,
    required: true,
    joi: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  },
  {
    label: "Password",
    name: "password",
    id: "password",
    type: "password",
    sm: 12,
    required: true,
    joi: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{0,}$"
        )
      )
      .min(8)
      .max(15)
      .required()
      .messages({
        "string.pattern.base": `Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&).`,
        "string.min": `Password must be at least 8 characters long.`,
        "string.max": `Password cannot exceed 15 characters.`,
        "any.required": `Password is required.`,
      }),
  },
];
