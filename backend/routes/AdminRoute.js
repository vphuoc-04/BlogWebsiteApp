import express from 'express'
import { 
    UploadAvatar,
    DeleteAvatar,
    EditProfile,
    EditPrimaryEmail,
} from '../controllers/AdminController.js';

const router = express.Router();

router.put('/update/profile/avatar/:id', UploadAvatar);
router.put('/delete/profile/avatar/:id', DeleteAvatar);
router.put('/edit/profile/info/:id', EditProfile);
router.put('/edit/profile/primary/email/:id', EditPrimaryEmail);

export default router;