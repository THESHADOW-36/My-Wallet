import { Router } from "express";
import { addExpenses, deleteExpense, editExpense, getExpenses } from "../controllers/expenses.js";
import { protecter } from "../middleware/auth.js";

const wallet = Router();

wallet.post('/expenses',protecter, addExpenses)
wallet.get('/expenses',protecter, getExpenses)
wallet.patch('/expense/:id',protecter, editExpense)
wallet.delete('/expense/:id',protecter, deleteExpense)
// wallet.get('/expenses',protecter, filterExpenses)
// wallet.post('/income',protecter, addIncome)

export default wallet;