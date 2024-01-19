import { Router } from "express";
import { addExpenses, addIncome, getExpenses } from "../controllers/wallet.js";
import { protecter } from "../middleware/auth.js";

const wallet = Router();

wallet.post('/expenses',protecter, addExpenses)
wallet.get('/get-exp',protecter, getExpenses)
wallet.post('/income',protecter, addIncome)

export default wallet;