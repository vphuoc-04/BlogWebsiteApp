import express from 'express'
import { LoginAdmin, LogoutAdmin } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/admin/login', LoginAdmin);
router.post('/admin/logout', LogoutAdmin);

export default router;