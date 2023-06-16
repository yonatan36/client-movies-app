import Joi from "joi";
import PasswordField from "../../components/PasswordField";

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
      .required(),
    // component: PasswordField,
  },
];
