import { Router } from "express";
import auth from "./auth.js";
import expenses from "./expenses.js";

const router = Router();

router.use('/auth', auth)
router.use('/wallet', expenses)

export default router;