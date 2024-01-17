import { Router } from "express";
import auth from "./auth";
import wallet from "./wallet";

const router = Router();

router.use('/auth', auth)
router.use('/wallet', wallet)

export default router;