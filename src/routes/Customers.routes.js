import { Router } from "express";
import {checkCustomerBody, checkCustomerInDataBase, checkCustomerIdInDataBase} from "../middlewares/Customers.middleware.js";
import {postNewCustomer, putCustomer, getAllCustomers, getCustomerById} from "../controllers/customers.controllers.js";

const router = Router();

router.post("/customers", checkCustomerBody, checkCustomerInDataBase, postNewCustomer);
router.put("/customers/:id", checkCustomerBody, checkCustomerInDataBase, checkCustomerIdInDataBase, putCustomer);
router.get("/customers", getAllCustomers);
router.get("/customers/:id", checkCustomerIdInDataBase, getCustomerById);

export default router;