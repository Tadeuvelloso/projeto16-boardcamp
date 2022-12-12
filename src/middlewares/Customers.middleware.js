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

export async function checkCustomerInDataBase (req, res, next) {
    const customer = res.locals.customer;

    try {
       const cpfCustomerExist = await connectionDB.query(`SELECT * FROM customers WERE cpf=$1 ;`, [customer.cpf])

        if(cpfCustomerExist.rows[0]){
            return res.sendStatus(409)
        }
    } catch (error){
        return res.status(500).send(error.message);
    }

    res.locals.customer = customer;
    next();
}

export async function checkCustomerIdInDataBase (req, res, next) {
    const customer = res.locals.customer;
    const id = req.params;

    try {
       const idCustomerExist = await connectionDB.query(`SELECT * FROM customers WERE id=$1 ;`, [id])

        if(idCustomerExist.rows[0]){
            return res.sendStatus(409)
        }
    } catch (error){
        return res.status(500).send(error.message);
    }

    res.locals.customer = customer;
    res.locals.id = id;
    next();
}