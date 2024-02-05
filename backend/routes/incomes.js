import { Router } from "express";
import { protecter } from "../middleware/auth.js";
import { addIncomes, deleteIncome, editIncome, getIncomes, getSingleIncome } from "../controllers/incomes.js";

const wallet = Router();

wallet.post('/incomes',protecter, addIncomes)
wallet.get('/incomes',protecter, getIncomes)
wallet.get('/income/:id',protecter, getSingleIncome)
wallet.put('/income/:id',protecter, editIncome)
wallet.delete('/income/:id',protecter, deleteIncome)

export default wallet;