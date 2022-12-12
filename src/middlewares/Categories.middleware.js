import { connectionDB } from "../database/db.js";

export async function checkCategories (req, res, next) {
    const categorie = req.body;

    if (!categorie) {
        return res.sendStatus(400);
    }

    try {
        const existCategorie = await connectionDB.query("SELECT * FROM categories WHERE name=$1 ;", [categorie.name])

        if (existCategorie.rows[0]) {
            return res.sendStatus(409);
        }

    } catch (error) {
        
        return res.status(500).send(err.message);
    }
    res.locals.categorie = categorie;
    next();
}