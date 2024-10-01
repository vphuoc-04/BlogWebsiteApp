import { database } from '../database.js';
import jwt from 'jsonwebtoken'

const UploadAvatar = (req, res) => {
    const token = req.cookies.admin_token;
    if (!token) { return res.status(401).json("Not verified!") }
    jwt.verify(token, "admin_jwtkey", async (err) => {
        if (err) { return res.status(403).json("Invalid token!") }

        const adminId = req.params.id;

        const query = "UPDATE admin SET `avatar` = ? WHERE `id` = ?"

        database.query(query, [req.body.avatar, adminId], (err) => {
            if (err) { return res.status(500).json("Error updating avatar!") }
            res.status(200).json("Avatar updated successfully!")
        })
    })
}

export { 
    UploadAvatar
}