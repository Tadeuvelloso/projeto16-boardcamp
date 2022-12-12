import { connectionDB }  from "../database/db.js";

export async function postCategories (req, res){
    const categorie = res.locals.categorie;

    try {
        await connectionDB.query("INSERT INTO categories (name) VALUES ($1);", [categorie.name])
        res.sendStatus(201)
    } catch (error){
        res.status(500).send(error.message);
        return
    }

}

export async function getCategories (req, res){

    try {
       const allCategories = await connectionDB.query("SELECT * FROM categories;");
        res.send(allCategories.rows);
    } catch (error){
        res.status(500).send(error.message);
        return
    }
}