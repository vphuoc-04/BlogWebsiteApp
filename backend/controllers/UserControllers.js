import { database } from '../database.js';
import bcrypt from 'bcrypt';
import { SendOTPEmail } from '../services/SendOTPEmail.js';
import { SendOTPReset } from '../services/SendOTPReset.js';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SaltRounds = 10;

const GetUser = (req, res) => {
    const q = "SELECT * FROM users";

    database.query(q,  (err, data) => {
        if (err) { return res.status(500).json("Error fetching user data."); }
        return res.status(200).json(data);
    })
}

const GetUserByUsername = (req, res) => {
    const query = "SELECT * FROM users WHERE username = ?";

    const { username } = req.params;

    database.query(query, [username], (err, data) => {
        if (err) {
            return res.status(500).json("Error fetching user data.");
        }
        if (data.length === 0) {
            return res.status(404).json("User not found.");
        }
        return res.status(200).json(data[0]);
    });
};

const Register = async (req, res) => {

    const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";

    database.query(checkQuery, [req.body.email, req.body.username], async (err, data) => {
        if (err) { return res.status(500).json("Database error!"); }

        if (data.length > 0) { return res.status(400).json("Account already exists!"); }

        const hashedPassword = await bcrypt.hash(req.body.password, SaltRounds);

        const checkPassword = req.body.password !== req.body.confirmpassword;

        if (checkPassword) { return res.status(400).json("Passwords do not match!"); }
        
        const query = "INSERT INTO users(`avatar`, `firstname`, `lastname`, `username`, `email`, `password`, `created_at`) VALUES (?)";

        const values = [req.body.avatar, req.body.firstname, req.body.lastname, req.body.username, req.body.email, hashedPassword, req.body.createdat];

        database.query(query, [values], (err, data) => {
            if (err) { return res.status(500).json("Registration error!"); }
            return res.status(201).json("Registration successful!");
        });
    });
};


const SendOTPVerification = async (req, res) => {
    const { email, otp } = req.body;
    try {
        await SendOTPEmail(email, otp);
        res.status(200).json("OTP sent successfully.");
    } 
    catch (error) {
        console.error("Error sending OTP: ", error);
        res.status(500).json("Error sending OTP.");
    }
};

const CheckEmailUsername = (req, res) => {
    const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";

    database.query(checkQuery, [req.body.email, req.body.username], (err, data) => {
        if (err) { return res.status(500).json("Database error!"); }

        if (data.length > 0) {
            return res.status(200).json({ exists: true }); 
        } 
        
        else {
            return res.status(200).json({ exists: false }); 
        }
    });
};

const GetEmailByUsername = (req, res) => {
    const { username } = req.query;

    const query = "SELECT email FROM users WHERE username = ?";

    database.query(query, [username], (err, data) => {
        if (err) { return res.status(500).json("Database error!"); }

        if (data.length === 0) { return res.status(404).json("User not found!"); }

        return res.status(200).json({ email: data[0].email });
    });
}

const IdentifyUser = (req, res) => {
    const { userNameOrEmail } = req.body;

    if (!userNameOrEmail) { return res.status(400).json("Please provide a username or email."); }

    const findUserQuery = "SELECT * FROM users WHERE username = ? OR email = ?";

    database.query(findUserQuery, [req.body.userNameOrEmail, req.body.userNameOrEmail], (err, data) => {
        if (err) { return res.status(500).json("Error fetching user data."); }
        
        if (data.length > 0) { return res.status(200).json(data); } 
        
        else { return res.status(404).json("User not found."); }
    });
}

const SendOTPResetPassword = async (req, res) => {
    const { email, otp } = req.body;
    try {
        await SendOTPReset(email, otp);
        res.status(200).json("OTP sent successfully.");
    } 
    catch (error) {
        console.error("Error sending OTP: ", error);
        res.status(500).json("Error sending OTP.");
    }
};

const ResetPassword = async (req, res) => {
    const { usernameOrEmail, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, SaltRounds);

        const query = "UPDATE users SET password = ? WHERE username = ? OR email = ?";
        
        database.query(query, [hashedPassword, usernameOrEmail, usernameOrEmail], (err, data) => {
            if (err) { return res.status(500).json("Database error!"); }

            if (data.affectedRows === 0) { return res.status(404).json("User not found!"); }

            return res.status(200).json("Password updated successfully!");
        });
    } 
    catch (error) {
        console.error('Error hashing password: ', error);
        return res.status(500).json("Error processing password!");
    }
};

const UploadAvatar = (req, res) => {
    const token = req.cookies.user_token;
    if (!token) { return res.status(401).json("Not verified!"); }

    jwt.verify(token, "user_jwtkey", async (err) => {
        if (err) { return res.status(403).json("Invalid token!"); }

        const userId = req.params.id;
        const newAvatar = req.body.avatar; 

        const getCurrentAvatarQuery = "SELECT avatar FROM users WHERE id = ?";
        database.query(getCurrentAvatarQuery, [userId], (err, results) => {
            if (err) { return res.status(500).json("Error fetching current avatar!"); }

            const currentAvatar = results[0]?.avatar;

            const updateAvatarQuery = "UPDATE users SET `avatar` = ? WHERE `id` = ?";

            database.query(updateAvatarQuery, [newAvatar, userId], async (err) => {
                if (err) { return res.status(500).json("Error updating avatar!"); }

                if (currentAvatar && currentAvatar !== newAvatar) {
                    const avatarPath = path.join(__dirname, "../../frontend/public/upload/clients/img", currentAvatar);

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
    const token = req.cookies.user_token;
    if (!token) { return res.status(401).json("Not verified!"); }

    jwt.verify(token, "user_jwtkey", async (err) => {
        if (err) { return res.status(403).json("Invalid token!"); }

        const userId = req.params.id;

        const userQuery = "SELECT avatar FROM users WHERE id = ?";
        database.query(userQuery, [userId], async (err, results) => {
            if (err) { return res.status(500).json("Error fetching user data!"); }

            if (results.length === 0) { return res.status(404).json("User not found!"); }

            const currentAvatar = results[0].avatar; 

            const newAvatar = "https://imgur.com/AhaZ0qB.jpg"; 

            const q = "UPDATE users SET `avatar` = ? WHERE `id` = ?";

            database.query(q, [newAvatar, userId], async (err) => {
                if (err) { return res.status(500).json("Avatar delete failed!"); }

                if (currentAvatar !== newAvatar) {
                    const avatarPath = path.join(__dirname, "../../frontend/public/upload/clients/img", currentAvatar);

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

export { 
    GetUser,
    GetUserByUsername,
    Register,
    SendOTPVerification,
    CheckEmailUsername,
    IdentifyUser,
    GetEmailByUsername,
    SendOTPResetPassword,
    ResetPassword,
    UploadAvatar,
    DeleteAvatar
};
