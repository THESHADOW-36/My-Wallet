import { Router } from "express";
import { addExpenses, addIncome } from "../controllers/wallet.js";
import { protecter } from "../middleware/auth.js";

const wallet = Router();

wallet.post('/expenses',protecter, addExpenses)
wallet.post('/income',protecter, addIncome)

export default wallet;