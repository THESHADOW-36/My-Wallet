import { Router } from "express";
import { protecter } from "../middleware/auth.js";
import { statistics } from "../controllers/statistics.js";

const stats = Router();

stats.get('/stats', protecter, statistics)

export default stats;