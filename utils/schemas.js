const Joi = require("joi");

createDiagramSchema = Joi.object({
  name: Joi.string().min(3).required(),
  inHouse: Joi.boolean().required(),
});

module.exports = {
  createDiagramSchema,
};
