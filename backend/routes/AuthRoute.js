import express from 'express'
import { 
    LoginAdmin, 
    LoginUser, 
    LogoutAdmin 
} from '../controllers/AuthController.js';

const router = express.Router();

router.post('/admin/login', LoginAdmin);
router.post('/admin/logout', LogoutAdmin);
router.post('/user/login', LoginUser);

export default router;