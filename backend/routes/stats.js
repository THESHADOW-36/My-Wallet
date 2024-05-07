import { Router } from "express";
import { protecter } from "../middleware/auth.js";
import { statistics, editTransaction, addTransaction, getTransaction, deleteTransaction, chartStats } from "../controllers/statistics.js";

const stats = Router();

stats.get('/stats', protecter, statistics)
stats.get('/chart-stats', protecter, chartStats)
stats.post('/transaction', addTransaction)
stats.get('/transaction', getTransaction)
stats.put('/transaction', editTransaction)
stats.delete('/transaction', deleteTransaction)

export default stats;