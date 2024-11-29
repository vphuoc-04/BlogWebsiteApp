import express from 'express'
import { 
    CreatePost, 
    GetPosts,
    GetPost, 
    UpdatePostThumbnail,
    ImageBelongPost,
    UpdatePostDescription,
} from '../controllers/PostController.js';

const router = express.Router();

router.post('/', CreatePost);
router.put('/thumbnail/:id', UpdatePostThumbnail);
router.post('/images/:id', ImageBelongPost);
router.put('/update-des/:id', UpdatePostDescription);
router.get('/data', GetPost);
router.get('/data/:id', GetPosts);

export default router;