import {Router} from 'express';
import { LoginUser, registerUser } from '../controllers/auth_controller.js';
import { AddProperty } from '../controllers/Property.controller.js';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(LoginUser);
export default router;