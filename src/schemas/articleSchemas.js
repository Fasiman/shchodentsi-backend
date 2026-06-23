import Joi from "joi";

export const articleSchema = Joi.object({
  title: Joi.string().min(1).required(),
  article: Joi.string().min(1).required(),
  category: Joi.string().min(1).required(),
  rate: Joi.number().integer().min(0).max(10).optional(),
  img: Joi.string().uri().optional().allow(""),
  saveCount: Joi.number().integer().min(0).optional(),
  ownerId: Joi.alternatives().try(Joi.string(), Joi.number()).optional().allow(null),
  name: Joi.string().optional().allow(""),
  avatar: Joi.string().uri().optional().allow(""),
  date: Joi.string().isoDate().optional(),
  createdAt: Joi.string().isoDate().optional(),
}).options({ allowUnknown: false });

export const deleteArticleSchema = Joi.object({
  id: Joi.number().integer().required(),
});
