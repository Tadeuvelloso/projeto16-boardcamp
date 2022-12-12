import { connectionDB } from "../database/db.js";
import { gameSchemaValidation } from "../models/game.validation.js";

export function gamesBodyValidation (req, res, next) {
    const game = req.body;

    const { error } = gameSchemaValidation.validate(game, { abortEarly: false });

    if (error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    res.locals.game = game;
    next();
}

export async function checkGameInDataBase (req, res, next){
    const game = res.locals.game;
    console.log(game)

    try {
        const gameExist = await connectionDB.query("SELECT * FROM games WHERE name=$1 ;", [game.name]);

        if (gameExist.rows[0]) {
            return res.sendStatus(409);
        }

        const categoryIdExist = await connectionDB.query("SELECT * FROM categories WHERE id=$1 ;", [Number(game.categoryId)]);

        if (!categoryIdExist){
            return res.status(400).send("Id da categoria é inexistente!")
        }

    } catch (error) {
        console.log("aqui 2");
        return res.status(500).send(error.message);
    }

    next();
}