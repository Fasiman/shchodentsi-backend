import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  id: Joi.alternatives().try(Joi.string(), Joi.number()).optional(),
  avatar: Joi.string().base64().optional().allow(""),
  createdAt: Joi.string().isoDate().optional(),
  saved: Joi.number().integer().min(0).optional(),
  saved_art_ids: Joi.array().items(Joi.string()).optional(),
}).options({ allowUnknown: false });

export const deleteUserSchema = Joi.object({
  id: Joi.number().integer().required(),
});

export const validateRequest = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      return res.status(400).json({ 
        status: 'error',
        message: 'Validation failed',
        details: error.details[0].message 
      });
    }
    next();
  };
};
