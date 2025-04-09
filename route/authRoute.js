import express from 'express';
import {loginController, registerController, testControlller} from '../controlers/authController.js';

import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';

//router object 
const router = express.Router();

//routing
router.post('/register', registerController);
router.post('/login', loginController);

//test routes
router.get('/test', requireSignin, isAdmin, testControlller);

export default router