import Joi from "joi";

export const articleSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string(),
});

export const deleteArticleSchema = Joi.object({
  id: Joi.number().integer().required(),
});
