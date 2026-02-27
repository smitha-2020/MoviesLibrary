import express from "express";
import { authentication } from "../controller/authController.js";
import validation from "../middleware/schemaValidation.js";
import { AuthJoiValidation } from "../model/auth.js";

const router = express.Router();

router.post("/", validation(AuthJoiValidation), authentication);

export default router;
