import express from 'express'
import { 
    GetUser, 
    GetUserByUsername,
    Register, 
    SendOTPVerification,
    CheckEmailUsername,
    IdentifyUser,
    SendOTPResetPassword,
    GetEmailByUsername,
    ResetPassword, 
} from '../controllers/UserControllers.js';

const router = express.Router();

router.get('/data', GetUser);
router.get('/data/:username', GetUserByUsername);
router.post('/register', Register);
router.post('/send-otp', SendOTPVerification);
router.post('/check-email-username', CheckEmailUsername);
router.post('/identify', IdentifyUser);
router.get('/get/email', GetEmailByUsername);
router.post('/reset/password', SendOTPResetPassword);
router.put('/update/new/password/:id', ResetPassword);

export default router;