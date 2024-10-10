import express from 'express'
import { 
    Register, 
    SendOTP,
    CheckEmailUsername,
    IdentifyUser, 
} from '../controllers/UserControllers.js';

const router = express.Router();

router.post('/register', Register);
router.post('/send-otp', SendOTP);
router.post('/check-email-username', CheckEmailUsername);
router.post('/identify', IdentifyUser);

export default router;