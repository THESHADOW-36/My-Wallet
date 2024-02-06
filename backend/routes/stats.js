import { Router } from "express";
import { protecter } from "../middleware/auth.js";
import { statistics, editTransaction, addTransaction, getTransaction, deleteTransaction } from "../controllers/statistics.js";

const stats = Router();

stats.get('/stats', protecter, statistics)
stats.post('/transaction', addTransaction)
stats.get('/transaction', getTransaction)
stats.put('/transaction', editTransaction)
stats.delete('/transaction', deleteTransaction)

export default stats;