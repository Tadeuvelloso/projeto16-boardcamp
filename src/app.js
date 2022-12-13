import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import CategoriesRoutes from "./routes/Categories.routes.js"
import GamesRoutes from "./routes/Games.routes.js"
import CustomersRoutes from "./routes/Customers.routes.js"
import RentalsRoutes from "./routes/Rentals.routes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(CategoriesRoutes);
app.use(GamesRoutes);
app.use(CustomersRoutes);
app.use(RentalsRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));