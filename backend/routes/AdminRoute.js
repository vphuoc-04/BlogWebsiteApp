import express from 'express'
import { 
    UploadAvatar,
    DeleteAvatar,
    EditProfile,
    EditPrimaryEmail,
    AddBackupEmail,
    DeleteBackupEmail,
} from '../controllers/AdminController.js';

const router = express.Router();

router.put('/update/profile/avatar/:id', UploadAvatar);
router.put('/delete/profile/avatar/:id', DeleteAvatar);
router.put('/edit/profile/info/:id', EditProfile);
router.put('/edit/profile/primary/email/:id', EditPrimaryEmail);
router.put('/add/profile/backup/email/:id', AddBackupEmail);
router.put('/delete/profile/backup/email/:id', DeleteBackupEmail);

export default router;