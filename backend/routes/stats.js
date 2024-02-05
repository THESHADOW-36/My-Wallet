import { Router } from "express";
import { protecter } from "../middleware/auth.js";
import { statistics, editTransaction, addTransaction, getTransaction, deleteTransaction } from "../controllers/statistics.js";

const stats = Router();

stats.get('/stats', protecter, statistics)
stats.post('/transaction', protecter, addTransaction)
stats.get('/transaction', protecter, getTransaction)
stats.put('/transaction', protecter, editTransaction)
stats.delete('/transaction', protecter, deleteTransaction)

export default stats;