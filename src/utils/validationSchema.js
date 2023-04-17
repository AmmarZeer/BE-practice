const Joi = require("joi");

createDiagramValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  in_house: Joi.boolean().required(),
  is_processed: Joi.boolean().optional(),
});

module.exports = {
  createDiagramValidationSchema,
};
