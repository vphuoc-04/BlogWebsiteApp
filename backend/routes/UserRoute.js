import express from 'express'
import { 
    Register, 
    SendOTPVerification,
    CheckEmailUsername,
    IdentifyUser,
    SendOTPResetPassword,
    GetEmailByUsername, 
} from '../controllers/UserControllers.js';

const router = express.Router();

router.post('/register', Register);
router.post('/send-otp', SendOTPVerification);
router.post('/check-email-username', CheckEmailUsername);
router.post('/identify', IdentifyUser);
router.get('/get/email', GetEmailByUsername);
router.post('/reset/password', SendOTPResetPassword);

export default router;