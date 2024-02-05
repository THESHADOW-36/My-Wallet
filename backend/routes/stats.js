import { Router } from "express";
import { protecter } from "../middleware/auth.js";
import { statistics, transaction } from "../controllers/statistics.js";

const stats = Router();

stats.get('/stats', protecter, statistics)
stats.put('/transaction', protecter, transaction)

export default stats;