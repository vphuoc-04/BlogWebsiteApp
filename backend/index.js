import express from 'express'
import cookieParser from 'cookie-parser';
import AuthRoutes from './routes/AuthRoute.js'
import AdminRoutes from './routes/AdminRoute.js'
import { AdminAvatar } from './uploads/AdminAvatar.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoutes);

app.post('/api/admin-avatar', AdminAvatar);

app.listen(8800, () => {
    console.log("Connected!")
})