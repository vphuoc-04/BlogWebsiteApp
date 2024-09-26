import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

export const database = mysql.createConnection({
    host: process.env.HOST_NAME,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME
})