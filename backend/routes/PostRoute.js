import express from 'express'
import { 
    CreatePost, 
    GetPosts,
    GetPost 
} from '../controllers/PostController.js';

const router = express.Router();

router.post('/', CreatePost);
router.get('/data', GetPost)
router.get('/data/:id', GetPosts);

export default router;