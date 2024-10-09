import { database } from '../database.js';
import bcrypt from 'bcrypt';
import { SendOTPEmail } from '../services/SendOTPEmail.js';

const SaltRounds = 10;
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


const SendOTP= async (req, res) => {
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

export { 
    Register,
    SendOTP,
    CheckEmailUsername 
};
