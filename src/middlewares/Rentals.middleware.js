import { rentalsSchema}  from "../models/rentals.validation.js";
import { connectionDB } from "../database/db.js";

export function checkBodyRentalsObj (req, res, next) {
    const rental = req.body;

    if (!rental) {
        return res.sendStatus(400);
    }

    const { error } = rentalsSchema.validate(rental, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
    
    res.locals.rental = rental
    next();
}

export async function checkIdsInDb (req, res, next) {
    const rental = res.locals.rental;

    try {
        const customerIdExtist = await connectionDB.query("SELECT * FROM customers WHERE id=$1 ;", [rental.customerId])
        
        if(!customerIdExtist.rows){
            return res.status(400).send("Não achei nenhum usuario com esse ID");
        }

        const gameIdExist = await connectionDB.query("SELECT * FROM games WHERE id=$1 ;", [rental.gameId]);

        if(!gameIdExist.rows){
            return res.status(400).send("Não achei nenhum jogo com esse ID");
        }
        console.log("passei pelo middleware!")
    } catch (error) {
        return res.status(500).send(error.message);
    }

    res.locals.rental = rental;
    next();
}


