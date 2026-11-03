import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';

const router = express.Router();

// POST /api/users/register - הרשמה
router.post('/register', registerUser);

// POST /api/users/login - התחברות
router.post('/login', loginUser);

export default router;