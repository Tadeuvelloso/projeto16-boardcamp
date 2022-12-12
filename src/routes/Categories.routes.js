import { Router } from "express";
import { checkCategories } from "../middlewares/Categories.middleware.js";
import { getCategories, postCategories } from "../controllers/categories.controllers.js";


const router = Router();

router.get("/categories", getCategories)
router.post("/categories",checkCategories, postCategories)

export default router;