import { connectionDB } from "../database/db.js";

export async function postNewCustomer(req, res) {
    const { name, phone, cpf, birthday } = res.locals.customer;

    try {
        await connectionDB.query(`INSER INTO customers (name, phone, cpf, birthday) VALUES (1$, 2$, 3$, 4$) ;`, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (error) {
        return res.staus(500).send(error.message);
    }
}

export async function putCustomer(req, res) {
    const { name, phone, cpf, birthday } = res.locals.customer;
    const { id } = res.locals.id;

    try {
        await connectionDB.query(`UPDATE customers (name=$1, phone=$2, cpf=$3, birthday=$4) WHERE id=$5;`, [name, phone, cpf, birthday, id]);
        res.sendStatus(200);
    } catch (error) {
        return res.staus(500).send(error.message);
    }
}

export async function getAllCustomers(req, res) {

    try {
        const allCustomers = await connectionDB.query("SELECT * FROM customers;");
        res.send(allCustomers.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function getCustomerById (req, res) {
    const { id } = res.locals.id;

    try {
        const customerById = await connectionDB.query("SELECT * FROM customers WHERE id=$1;", [id])
        res.send(customerById.rows[0]);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}