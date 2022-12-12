import joi from "joi";

export const gameSchemaValidation = joi.object({
    name: joi.string().required().trim(),
    image: joi.string().required(),
    stockTotal: joi.number().min(1).required(),
    categoryId: joi.number().min(1).required(),
    pricePerDay: joi.number().min(1).required(),
});