const Joi = require("joi");

const expenseSchema = Joi.object({
  title: Joi.string().min(2).required(),
  amount: Joi.number().positive().required(),
  category: Joi.string().required(),
  date: Joi.string().required(),
  time: Joi.string().required()
});

module.exports = expenseSchema;
