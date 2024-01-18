import { Router } from "express";
import auth from "./auth.js";
import wallet from "./wallet.js";

const router = Router();

router.use('/auth', auth)
router.use('/wallet', wallet)

export default router;