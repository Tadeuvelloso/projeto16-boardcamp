import { connectionDB } from "../database/db.js";
import dayjs from "dayjs";

const now = dayjs();
const date = now.format("DD/MM/YYYY");

export async function getAllRentals(req, res) {

    try {
        const allRentals = await connectionDB.query("SELECT * FROM rentals;");
        res.send(allRentals.rows);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function postNewRental(req, res) {
    const rental = res.locals.rental;

    try {
        const game = await connectionDB.query("SELECT * FROM games WHERE id=$1 ;", [rental.gameId]);


        const originalPrice = Number(game.pricePerDay) * rental.daysRented;

        if (Number(game.rows[0].stockTotal) < 1) {
            return res.status(400).send("Sem estoque do jogo no momento");
        }

        const stockGamesInRent = await connectionDB.query(`SELECT * FROM rentals WHERE "gameId"=$1 ;`, [rental.gameId]);

        if (stockGamesInRent.rows.length > game.rows[0].stockTotal) {
            return res.status(400).send("sem estoque desse jogo no momento!");
        }

        await connectionDB.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3 ,$4 ,$5 ,$6 ,$7);`, [rental.customerId, rental.gameId, date, rental.daysRented, null, originalPrice, null]);
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params;
    try {
        const checkIdRental = await connectionDB.query("SELECT * FROM rentals WHERE id=$1 ;", [id]);

        if (checkIdRental.rows) {
            return res.sendStatus(400);
        }

        await connectionDB.query("DELETE FROM rentals WHERE id=$1", [id]);

        res.sendStatus(200)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function postReturnRental(req, res) {
    const rental = res.locals.rental;
    const { id } = req.params;

    try {
        
        const checkIdRental = await connectionDB.query("SELECT * FROM rentals WHERE id=$1 ;", [id]);

        if (checkIdRental.rows) {
            return res.sendStatus(404);
        }

        const totalValueToPay = rental.originalPrice;

        await connectionDB.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3 ,$4 ,$5 ,$6 ,$7);`, [rental.customerId, rental.gameId, rental.date, rental.daysRented, date, originalPrice, totalValueToPay]);
        res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}