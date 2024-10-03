import express from 'express'
import { 
    UploadAvatar,
    DeleteAvatar,
    EditProfile,
} from '../controllers/AdminController.js';

const router = express.Router();

router.put('/update/profile/avatar/:id', UploadAvatar);
router.put('/delete/profile/avatar/:id', DeleteAvatar);
router.put('/edit/profile/info/:id', EditProfile);

export default router;