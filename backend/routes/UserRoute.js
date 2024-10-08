import express from 'express'
import { 
    Register, 
} from '../controllers/UserControllers.js';

const router = express.Router();

router.post('/register', Register);

export default router;