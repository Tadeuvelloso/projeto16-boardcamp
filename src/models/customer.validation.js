import joi from "joi";

export const customerBodyValidation = joi.object({
    name: joi.string().required(),
    phone: joi.number().min(11111111111).max(99999999999).required(),
    cpf: joi.number().min(1111111111).max(99999999999).required(),
    birthday: joi.date().less('now').iso().required()
});