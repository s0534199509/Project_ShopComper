import { Router } from 'express';
import { login, register } from '../controllers/user.controller.js';
import { validateBody } from '../middlewares/validatoloi.middleware.js';
import { loginUserSchema, registerUserSchema } from '../validations/user.validation.js';

const router = Router();

router.post('/register', validateBody(registerUserSchema), register);
router.post('/login', validateBody(loginUserSchema), login);

export default router;