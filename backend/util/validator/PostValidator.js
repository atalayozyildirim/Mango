import Joi from "joi";

const postValidator = Joi.object({
  title: Joi.string(),
  content: Joi.string(),
  image: Joi.string(),
  video: Joi.string(),
  uri: Joi.string(),
});

export { postValidator };
