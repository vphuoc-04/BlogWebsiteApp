import { database } from '../database.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

export { LoginAdmin }