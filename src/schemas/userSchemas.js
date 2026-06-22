import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

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
