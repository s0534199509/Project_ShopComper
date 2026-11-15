import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';
import { validateBody } from '../middlewares/custom.middleware.js';
import { loginUserSchema, registerUserSchema } from '../validations/user.validation.js';

const router = Router();

router.post('/register', validateBody(registerUserSchema), registerUser);
router.post('/login', validateBody(loginUserSchema), loginUser);

export default router;
