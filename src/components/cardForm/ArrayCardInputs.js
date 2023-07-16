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
    label: "Image Alt",
    name: "alt",
    id: "imageAlt",
    type: "text",
    sm: 6,
    required: false,
    joi: Joi.string().allow(""),
  },
  {
    label: "Demo Movie (Image URL)",
    name: "url",
    id: "imageUrl",
    type: "text",
    sm: 12,
    required: false,
    joi: Joi.string()
      // .pattern(
      //   new RegExp(
      //     "^(https?://)?[^\\s/]+\\.[^\\s/]+/\\S+\\.(jpg|jpeg|png|gif)$"
      //   )
      // )
      .messages({ "string.pattern.base": `Image url is not vaild` })
      .allow(""),
  },
];
