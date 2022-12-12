import { connectionDB } from "../database/db.js";
import { customerBodyValidation } from "../models/customer.validation.js"

export function checkCustomerBody (req, res, next){
    const customer = req.body;

    if(!customer){
        return res.sendStatus(400);
    }

    const { error } = customerBodyValidation.validate(customer, { abortEarly: false });

    if (error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    res.locals.customer = customer;
    next();
}

