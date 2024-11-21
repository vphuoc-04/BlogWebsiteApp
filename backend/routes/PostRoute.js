import express from 'express'
import { 
    CreatePost, 
    GetPosts,
    GetPost, 
    UpdatePostThumbnail,
    ImageBelongPost,
} from '../controllers/PostController.js';

const router = express.Router();

router.post('/', CreatePost);
router.put('/thumbnail/:id', UpdatePostThumbnail);
router.post('/images/:id', ImageBelongPost);
router.get('/data', GetPost);
router.get('/data/:slug', GetPosts);

export default router;