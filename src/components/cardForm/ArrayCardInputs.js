import Joi from "joi";

export const cardFormArray = [
  {
    label: "Title",
    name: "title",
    id: "title",
    type: "text",
    sm: 6,
    required: true,
    joi: Joi.string().required(),
  },
  {
    label: "Sub Title",
    name: "subTitle",
    id: "subTitle",
    type: "text",
    sm: 6,
    required: true,
    joi: Joi.string().required(),
  },
  {
    label: "Description",
    name: "description",
    id: "description",
    type: "text",
    sm: 12,
    required: true,
    joi: Joi.string().required(),
  },
  {
    label: "Phone",
    name: "phone",
    id: "phone",
    type: "tel",
    sm: 6,
    required: true,
    joi: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
      .required(),
  },
  {
    label: "Email",
    name: "email",
    id: "email",
    type: "email",
    sm: 6,
    required: true,
    joi: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  },
  {
    label: "Web",
    name: "web",
    id: "web",
    type: "url",
    sm: 12,
    required: false,
    joi: Joi.string().allow(""),
  },
  {
    label: "Image Alt",
    name: "alt",
    id: "imageAlt",
    type: "text",
    sm: 6,
    required: false,
    joi: Joi.string().allow(""),
  },
  {
    label: "Image URL",
    name: "url",
    id: "imageUrl",
    type: "url",
    sm: 6,
    required: false,
    joi: Joi.string()
      .pattern(
        new RegExp(
          "^(https?://)?[^\\s/]+\\.[^\\s/]+/\\S+\\.(jpg|jpeg|png|gif)$"
        )
      )
      .messages({ "string.pattern.base": `Image url is not vaild` })
      .allow(""),
  },
  {
    label: "State",
    name: "state",
    id: "state",
    type: "text",
    sm: 4,
    required: false,
    joi: Joi.string().allow(""),
  },
  {
    label: "Country",
    name: "country",
    id: "country",
    type: "text",
    sm: 4,
    required: true,
    joi: Joi.string().required(),
  },
  {
    label: "City",
    name: "city",
    id: "city",
    type: "text",
    sm: 4,
    required: true,
    joi: Joi.string().required(),
  },
  {
    label: "Street",
    name: "street",
    id: "street",
    type: "text",
    sm: 4,
    required: true,
    joi: Joi.string().required(),
  },
  {
    label: "House Number",
    name: "houseNumber",
    id: "houseNumber",
    type: "number",
    sm: 4,
    required: true,
    joi: Joi.number().required(),
  },
  {
    label: "Zip",
    name: "zip",
    id: "zip",
    type: "text",
    sm: 4,
    required: false,
    joi: Joi.string().allow(""),
  },
];
