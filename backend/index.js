import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Routes 
import AuthRoutes from './routes/AuthRoute.js';
import AdminRoutes from './routes/AdminRoute.js';
import UserRoutes from './routes/UserRoute.js';
import PostRoutes from './routes/PostRoute.js';

// Upload routes
import { AdminAvatar } from './uploads/AdminAvatar.js';
import { PostThumbnail } from './uploads/PostThumbnail.js';
import { ImageBelongPost } from './uploads/ImageBelongPost.js';

const app = express();
app.use(express.json());  
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/post', PostRoutes);

app.post('/api/admin-avatar', AdminAvatar);
app.post('/api/post-thumbnail/:id', PostThumbnail);
app.post('/api/image-post/:id', ImageBelongPost);

app.listen(8800, () => {
    console.log("Connected!")
})