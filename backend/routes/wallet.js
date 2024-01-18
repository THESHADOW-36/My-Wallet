import { Router } from "express";
import { addExpenses, addIncome } from "../controllers/wallet.js";

const wallet = Router();

wallet.post('/expenses', addExpenses)
wallet.post('/income', addIncome)

export default wallet;