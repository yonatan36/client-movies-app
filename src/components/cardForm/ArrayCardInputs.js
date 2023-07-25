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
    label: "createdYear",
    name: "createdYear",
    id: "createdYear",
    type: "number",
    sm: 6,
    required: true,
    joi: Joi.number().min(1000).max(9999).required().messages({
      "number.base": `Please enter a valid number.`,
      "number.integer": `Please enter an integer (no decimal places).`,
      "number.min": `Please enter min 4 numbers.`,
      "number.max": `Please enter max 4 numbers.`,
      "any.required": `This field is required.`,
    }),
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
      .pattern(
        new RegExp(
          "^(https://www.|http://www.|https://|http://)?[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})(.[a-zA-Z0-9]{2,})?|(https|assets/u[0-9]+.jpg)$"
        )
      )
      .messages({ "string.pattern.base": `Image url is not vaild` })
      .allow(""),
  },
];
