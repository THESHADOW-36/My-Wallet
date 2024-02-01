import { Router } from "express";
import { protecter } from "../middleware/auth.js";
import { addExpenses, deleteExpense, editExpense, getExpenses } from "../controllers/expenses.js";

const wallet = Router();

wallet.post('/expenses',protecter, addExpenses)
wallet.get('/expenses',protecter, getExpenses)
wallet.put('/expense/:id',protecter, editExpense)
wallet.delete('/expense/:id',protecter, deleteExpense)

export default wallet;