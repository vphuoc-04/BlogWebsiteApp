import express from 'express'
import { 
    Register, 
    SendOTP,
    CheckEmailUsername, 
} from '../controllers/UserControllers.js';

const router = express.Router();

router.post('/register', Register);
router.post('/send-otp', SendOTP);
router.post('/check-email-username', CheckEmailUsername);

export default router;