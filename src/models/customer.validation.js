import joi from "joi";

export const customerBodyValidation = joi.object({
    name: joi.string().required(),
    phone: joi.number().min(11).max(11).required(),
    cpf: joi.number().min(10).max(11).required(),
    birthday: joi.date().max('now').min('1-1-1922')
});