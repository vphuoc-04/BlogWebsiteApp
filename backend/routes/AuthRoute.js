import express from 'express'
import { 
    LoginAdmin, 
    LoginUser, 
    LogoutAdmin, 
    LogoutUser
} from '../controllers/AuthController.js';

const router = express.Router();

router.post('/admin/login', LoginAdmin);
router.post('/admin/logout', LogoutAdmin);
router.post('/user/login', LoginUser);
router.post('/user/logout', LogoutUser);

export default router;