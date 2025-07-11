import express from 'express';
import { login, logout, signup } from '../controllers/auth.controllers.js';

const router = express.Router();

export default router;

router.get("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);

