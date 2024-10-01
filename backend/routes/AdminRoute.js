import express from 'express'
import { 
    UploadAvatar,
    DeleteAvatar,
} from '../controllers/AdminController.js';

const router = express.Router();

router.put('/update/profile/avatar/:id', UploadAvatar);
router.put('/delete/profile/avatar/:id', DeleteAvatar);

export default router;