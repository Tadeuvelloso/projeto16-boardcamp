import { Router } from "express";
import { gamesBodyValidation, checkGameInDataBase} from "../middlewares/Games.middleware.js"
import { postNewGame, getAllGames} from "../controllers/games.controllers.js"

const router = Router();

router.post("/games", gamesBodyValidation, checkGameInDataBase, postNewGame);
router.get("/games", getAllGames);

export default router;