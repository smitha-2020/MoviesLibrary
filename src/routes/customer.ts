import express from "express";
import validation from "../middleware/schemaValidation.js";
const router = express.Router();

import {
  CustomerJoiSchema,
  createCustomer,
  getAllCustomers,
  getCustomerById,
} from "../controller/customerController.js";

router.get("/", getAllCustomers);
router.get("/:id", getCustomerById);
router.post("/", validation(CustomerJoiSchema), createCustomer);

export default router;
