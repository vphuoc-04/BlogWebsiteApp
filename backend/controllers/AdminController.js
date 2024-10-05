import { database } from '../database.js';
import jwt from 'jsonwebtoken'
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const UploadAvatar = (req, res) => {
    const token = req.cookies.admin_token;
    if (!token) { return res.status(401).json("Not verified!"); }

    jwt.verify(token, "admin_jwtkey", async (err) => {
        if (err) { return res.status(403).json("Invalid token!"); }

        const adminId = req.params.id;
        const newAvatar = req.body.avatar; 

        const getCurrentAvatarQuery = "SELECT avatar FROM admin WHERE id = ?";
        database.query(getCurrentAvatarQuery, [adminId], (err, results) => {
            if (err) { return res.status(500).json("Error fetching current avatar!"); }

            const currentAvatar = results[0]?.avatar;

            const updateAvatarQuery = "UPDATE admin SET `avatar` = ? WHERE `id` = ?";

            database.query(updateAvatarQuery, [newAvatar, adminId], async (err) => {
                if (err) { return res.status(500).json("Error updating avatar!"); }

                if (currentAvatar && currentAvatar !== newAvatar) {
                    const avatarPath = path.join(__dirname, "../../frontend/public/upload/admin/img", currentAvatar);

                    if (fs.existsSync(avatarPath)) {
                        try {
                            await fs.promises.unlink(avatarPath);
                        } 
                        catch (unlinkError) {
                            console.error("Error deleting old avatar file:", unlinkError.message);
                        }
                    } 
                    else {
                        console.log("Old avatar file not found for deletion at path:", avatarPath);
                    }
                }
                res.status(200).json("Avatar updated successfully!");
            });
        });
    });
};

const DeleteAvatar = async (req, res) => {
    const token = req.cookies.admin_token;
    if (!token) { return res.status(401).json("Not verified!"); }

    jwt.verify(token, "admin_jwtkey", async (err) => {
        if (err) { return res.status(403).json("Invalid token!"); }

        const AdminId = req.params.id;

        const adminQuery = "SELECT avatar FROM admin WHERE id = ?";
        database.query(adminQuery, [AdminId], async (err, results) => {
            if (err) { return res.status(500).json("Error fetching admin data!"); }

            if (results.length === 0) { return res.status(404).json("Admin not found!"); }

            const currentAvatar = results[0].avatar; 

            const newAvatar = "https://imgur.com/AhaZ0qB.jpg"; 

            const q = "UPDATE admin SET `avatar` = ? WHERE `id` = ?";

            database.query(q, [newAvatar, AdminId], async (err) => {
                if (err) { return res.status(500).json("Avatar delete failed!"); }

                if (currentAvatar !== newAvatar) {
                    const avatarPath = path.join(__dirname, "../../frontend/public/upload/admin/img", currentAvatar);

                    if (fs.existsSync(avatarPath)) {
                        try {
                            await fs.promises.unlink(avatarPath);
                        } 
                        catch (unlinkError) {
                            console.error("Error deleting avatar file:", unlinkError.message);
                        }
                    } 
                    else {
                        console.log("Avatar file not found for deletion at path:", avatarPath);
                    }
                }
                return res.json("Avatar has been deleted!");
            });
        });
    });
};

const EditProfile = (req, res) => {
    const token  = req.cookies.admin_token;
    if (!token) { return res.status(401).json("Not verified!"); }
    jwt.verify(token, "admin_jwtkey", async (err) => {
        if (err) { return res.status(403).json("Invalid token!"); }

        const adminId = req.params.id;

        const { firstname, lastname, username, bio } = req.body;

        const query = "UPDATE admin SET `firstname` = ?, `lastname` = ?, `username` = ?, `bio` = ? WHERE `id` = ?";

        database.query(query, [firstname, lastname, username, bio, adminId], (err) => {
            if (err) { return res.status(500).json("Failed to update profile!"); }
            return res.json("Profile has been updated!");
        });
    });
};

const EditPrimaryEmail = (req, res) => {
    const token  = req.cookies.admin_token;
    if (!token) { return res.status(401).json("Not verified!"); }
    jwt.verify(token, "admin_jwtkey", (err) => {
        if(err) { return res.status(403).json("Invalid token!") }

        const { email, password } = req.body;
        
        const adminId = req.params.id;

        const query = "SELECT password FROM admin WHERE id = ?";

        database.query(query, [adminId], async (err, data) => {
            if(err) { return res.status(500).json("Server error!"); }

            if(data.length === 0) { return res.status(404).json("Admin not found!"); }

            const checkPassword = data[0].password;

            const getHashPassword = await bcrypt.compare(password, checkPassword);

            if(!getHashPassword) { return res.status(401).json("Incorrect password!"); }

            const updateEmail = "UPDATE admin SET email = ? WHERE id = ?";

            database.query(updateEmail, [email, adminId], (err, data) => {
                if(err) { return res.status(500).json("Failed to update email!"); }

                return res.json("Email has been updated!");
            });
        });
    });
}

const AddBackupEmail = (req, res) => {
    const token  = req.cookies.admin_token;
    if (!token) { return res.status(401).json("Not verified!") }

    jwt.verify(token, "admin_jwtkey", (err) => {
        if (err) { return res.status(403).json("Invalid token!") }

        const { backupemail } = req.body;
        
        const adminId = req.params.id;

        const query = "UPDATE admin SET `backupemail` = ? WHERE `id` = ?";

        database.query(query, [backupemail, adminId], (err, data) => {
            if(err) return res.status(500).json("Failed to add backup email!");
            return res.json("Email backup has been added!")
        })
    })
}

export { 
    UploadAvatar,
    DeleteAvatar,
    EditProfile,
    EditPrimaryEmail,
    AddBackupEmail
}