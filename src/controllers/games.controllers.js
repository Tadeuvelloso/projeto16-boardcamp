import { connectionDB } from "../database/db.js";

export async function postNewGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = res.locals.game;

    try {
        await connectionDB.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`, [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    } catch (error) {
        console.log("aqui");
        return res.status(500).send(error.message);
    }
}

export async function getAllGames(req, res) {

    try {
        const allGames = await connectionDB.query("SELECT * FROM games;");
        res.send(allGames.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
}