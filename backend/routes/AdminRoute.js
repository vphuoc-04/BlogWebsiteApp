import express from 'express'
import { 
    UploadAvatar,
    DeleteAvatar,
    EditProfile,
    EditPrimaryEmail,
    AddBackupEmail,
    DeleteBackupEmail,
    SetPrimaryBackupEmail,
    DeletePrimaryEmail,
    ChangePassword,
} from '../controllers/AdminController.js';

const router = express.Router();

router.put('/update/profile/avatar/:id', UploadAvatar);
router.put('/delete/profile/avatar/:id', DeleteAvatar);
router.put('/edit/profile/info/:id', EditProfile);
router.put('/edit/profile/primary/email/:id', EditPrimaryEmail);
router.put('/add/profile/backup/email/:id', AddBackupEmail);
router.put('/delete/profile/backup/email/:id', DeleteBackupEmail);
router.put('/setprimary/profile/backup/email/:id', SetPrimaryBackupEmail);
router.put('/delete/profile/primary/email/:id', DeletePrimaryEmail);
router.put('/change/profile/password/:id', ChangePassword);

export default router;