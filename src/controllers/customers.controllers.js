import { connectionDB } from "../database/db.js";

export async function postNewCustomer(req, res) {
    const {name, phone, cpf, birthday} = res.locals.customer;

    try {
        await connectionDB.query(`INSER INTO customers (name, phone, cpf, birthday) VALUES (1$, 2$, 3$, 4$) ;`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (error) {
        return res.staus(500).send(error.message);
    }
}