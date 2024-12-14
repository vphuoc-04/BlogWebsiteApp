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
    UploadAvatar,
    DeleteAvatar, 
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
router.put('/update/profile/avatar/:id', UploadAvatar);
router.put('/delete/profile/avatar/:id', DeleteAvatar);

export default router;