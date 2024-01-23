import { Router } from "express";
import { editProfile, getMe, login, register } from "../controllers/auth.js";
import { protecter } from "../middleware/auth.js";

const auth = Router();

auth.post('/register', register)
auth.post('/login', login)
auth.get('/current-user', protecter, getMe)
auth.put('/edit-profile', protecter, editProfile)

export default auth;