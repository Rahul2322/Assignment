const Joi = require('joi');
const schema = Joi.object({
    username:Joi.string().required(),
    age:Joi.number().required(),
    hobbies:Joi.array().items(Joi.string()).empty().required()
});

module.exports = {
    schema
}