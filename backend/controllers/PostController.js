import { database } from '../database.js'
import jwt from 'jsonwebtoken'

const CreatePost = (req, res) => {
    const token = req.cookies.admin_token;
    if (!token) { return res.status(401).json("Not verified!"); }

    jwt.verify(token, "admin_jwtkey", async (err, adminInfo) => {
        if (err) { return res.status(403).json("Invalid token!"); }

        const query = "INSERT INTO posts(`title`, `foreword`, `des`, `thumbnail`, `posted_at`, `posted_by`) VALUES (?)";
        const values = [
            req.body.title,
            req.body.foreword,
            req.body.des,
            req.body.thumbnail,
            req.body.posted_at,
            adminInfo.id
        ];

        database.query(query, [values], (err, data) => {
            if (err) { return res.status(500).json("Error creating post!"); }

            const postId = data.insertId;
            if (!postId) { return res.status(500).json("Failed to create post, missing postId!"); }

            return res.status(201).json({ postId: postId });
        });
    });
};

const UpdatePostThumbnail = (req, res) => {
    const postId = req.params.id;
    const { thumbnail } = req.body;

    const query = "UPDATE posts SET thumbnail = ? WHERE id = ?";
    const values = [thumbnail, postId];

    database.query(query, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error updating post");
        }

        if (data.affectedRows === 0) {
            return res.status(404).json("Post not found");
        }

        res.status(200).json({ message: "Post updated successfully" });
    });
};

const GetPost = (req, res) => {
    const query = `
        SELECT p.*, JSON_ARRAYAGG(ip.image) AS images
        FROM posts p
        LEFT JOIN image_post ip ON p.id = ip.belong_post_id
        GROUP BY p.id
    `;

    database.query(query, (err, posts) => {
        if (err) {
            return res.status(500).json("Error fetching posts!");
        }
        return res.status(200).json(posts);
    });
};

const GetPosts = (req, res) => {
    const query = `
        SELECT p.id, p.title, p.foreword, p.des, p.thumbnail, p.posted_at, 
               a.firstname, a.lastname, a.username, a.avatar,
               JSON_ARRAYAGG(ip.image) AS images
        FROM posts p 
        JOIN admin a ON p.posted_by = a.id 
        LEFT JOIN image_post ip ON p.id = ip.belong_post_id
        WHERE p.id = ?
        GROUP BY p.id
    `;

    database.query(query, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json(data[0]); 
    });
};

export {
    CreatePost,
    UpdatePostThumbnail,
    GetPost,
    GetPosts
};