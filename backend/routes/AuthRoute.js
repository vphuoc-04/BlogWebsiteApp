import express from 'express'
import { LoginAdmin } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/admin/login', LoginAdmin);

export default router;