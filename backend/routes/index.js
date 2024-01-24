import { Router } from "express";
import auth from "./auth.js";
import expenses from "./expenses.js";
import incomes from "./incomes.js";

const router = Router();

router.use('/auth', auth)
router.use('/wallet', expenses)
router.use('/wallet', incomes)

export default router;