import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.js";
import { protecter } from "../middleware/auth.js";

const auth = Router();

auth.post('/register', register)
auth.post('/login', login)
auth.get('/current-user', protecter, getMe)

export default auth;