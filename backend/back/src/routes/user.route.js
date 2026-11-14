import {Router} from 'express';
import { LoginUser, registerUser, Getprofile , LogoutUser} from '../controllers/auth_controller.js';
import VerifyToken from '../middleware/auth.middleware.js';
const router = Router();

router.route('/logout').post(LogoutUser);
router.route('/register').post(registerUser);
router.route('/login').post(LoginUser);
router.route('/profile').get(VerifyToken, Getprofile)
export default router;

