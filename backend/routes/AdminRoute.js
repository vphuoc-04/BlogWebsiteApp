import express from 'express'
import { UploadAvatar } from '../controllers/AdminController.js';

const router = express.Router();

router.put('/update/profile/avatar/:id', UploadAvatar);

export default router;