import { database } from '../database.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Admin auth
const LoginAdmin = (req, res) => {
    const query = "SELECT * FROM admin WHERE username = ? OR email = ?";
    database.query(query, [req.body.userNameOrEmail, req.body.userNameOrEmail], (err, data) => {
        if (err) { return res.json(err) }

        if (data.length === 0) { return res.status(404).json("Admin not found!") }

        const IsPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!IsPasswordCorrect) { return res.status(400).json("Incorrect login information!") }

        const token = jwt.sign({ id: data[0].id }, "admin_jwtkey");

        const { password, ...AdminData } = data[0];

        res.cookie("admin_token", token, { httpOnly: true }).status(200).json(AdminData);
    })
};

const LogoutAdmin = (req, res) => {
    res.clearCookie("admin_token", { sameSite : "none", secure: "true" }).status(200).json("Account has been logged out!");
}

// User auth
const LoginUser = (req, res) => {
    const query = "SELECT * FROM users WHERE username = ? OR email = ?";
    database.query(query, [req.body.userNameOrEmail, req.body.userNameOrEmail], (err, data) => {
        if (err) { return res.json(err) }

        if (data.length === 0) { return res.status(404).json("User not found!") }

        const IsPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!IsPasswordCorrect) { return res.status(400).json("Incorrect login information!") }

        const token = jwt.sign({ id: data[0].id }, "user_jwtkey");

        const { password, ...UserData } = data[0];

        res.cookie("user_token", token, { httpOnly: true }).status(200).json(UserData);
    })
}

const LogoutUser = (req, res) => {
    res.clearCookie("user_token", { sameSite: "none", secure: "true" }).status(200).json("Account has been logged out!")
}

export { 
    LoginAdmin, 
    LogoutAdmin,
    LoginUser,
    LogoutUser 
}