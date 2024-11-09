import express from 'express'
import { 
    CreatePost, 
    GetPosts,
    GetPost, 
    UpdatePostThumbnail,
} from '../controllers/PostController.js';

const router = express.Router();

router.post('/', CreatePost);
router.put('/thumbnail/:id', UpdatePostThumbnail);
router.get('/data', GetPost);
router.get('/data/:id', GetPosts);

export default router;