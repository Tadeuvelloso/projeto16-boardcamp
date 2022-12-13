import { Router } from "express";
import { getAllRentals, postNewRental, deleteRental, postReturnRental } from "../controllers/rentals.controllers.js";
import { checkBodyRentalsObj, checkIdsInDb} from "../middlewares/Rentals.middleware.js"

const router = Router();

router.get("/rentals", getAllRentals);
router.post("/rentals", checkBodyRentalsObj, checkIdsInDb, postNewRental);
router.post("/rentals/:id/return", checkBodyRentalsObj, postReturnRental);
router.delete("/rentals/:id", deleteRental);

export default router;