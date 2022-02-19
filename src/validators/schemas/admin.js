const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email().max(128).lowercase().required(),
  password: Joi.string().min(8).max(32).required().strict(),
  confirmPassword: Joi.string().min(8).max(32).required().strict(),

});

const IdSchema = Joi.object({
  id: Joi.number().min(1).positive(),
});

const groupSchema = Joi.object({
  name: Joi.string().min(3).max(128).required(),
  topic:Joi.string().min(3).max(128).required()
});


module.exports = {
  userSchema,
  IdSchema,
 groupSchema,
};
