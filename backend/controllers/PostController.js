import { database } from '../database.js'
import jwt from 'jsonwebtoken'
import slugify from 'slugify';

const CreatePost = (req, res) => {
    const token = req.cookies.admin_token;
    if (!token) { return res.status(401).json("Not verified!"); }

    jwt.verify(token, "admin_jwtkey", async (err, adminInfo) => {
        if (err) { return res.status(403).json("Invalid token!"); }

        const slug = slugify(req.body.title, {
            lower: true,     
            strict: true,    
            replacement: "-", 
        });

        const query = "INSERT INTO posts(`title`, `slug`, `foreword`, `des`, `thumbnail`, `posted_at`, `posted_by`) VALUES (?)";
        const values = [
            req.body.title,
            slug,
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

const ImageBelongPost = (req, res) => {
    const token = req.cookies.admin_token;
    if (!token) { return res.status(401).json("Not verified!"); }

    jwt.verify(token, "admin_jwtkey", async (err, adminInfo) => {
        if (err) { return res.status(403).json("Invalid token!"); }

        const postId = req.params.id;
        if (!postId) { return res.status(400).json("Post ID is required"); }

        const imagePaths = req.body.image_path.image_path;
        const uploadedAt = req.body.uploaded_at;

        const imageArray = Array.isArray(imagePaths) ? imagePaths : [imagePaths];

        const values = imageArray.map(imagePath => [
            postId, 
            imagePath, 
            uploadedAt
        ]);

        const query = "INSERT INTO image_post (`post_id`, `image_path`, `uploaded_at`) VALUES ?";
        database.query(query, [values], (err, data) => {
            if (err) { 
                console.error("Database error:", err);
                return res.status(500).json("Error saving image to database"); 
            }

            const imageUrl = `../frontend/public/upload/posts/${postId}/images/${imagePaths[0]}`;

            return res.status(200).json({ message: "Image added to post successfully", imageUrl });
        });
    });
};

const GetPost = (req, res) => {
    const query = "SELECT * FROM posts";
    database.query(query,  (err, data) => {
        if (err) { return res.status(500).json("Error fetching posts!"); }
        return res.status(200).json(data);
    });
}

const GetPosts = (req, res) => {
    const postId = req.params.id;

    if (!postId) {
        return res.status(400).json({ message: "Post ID is required" });
    }

    const query = `
        SELECT p.id, p.slug, p.title, p.foreword, p.des, p.thumbnail, p.posted_at, 
               a.firstname, a.lastname, a.username, a.avatar, 
               GROUP_CONCAT(i.image_path) AS images 
        FROM posts p 
        JOIN admin a ON p.posted_by = a.id 
        LEFT JOIN image_post i ON p.id = i.post_id
        WHERE p.id = ?
        GROUP BY p.id;
    `;

    database.query(query, [postId], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error in database query", error: err });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json(data[0]);
    });
};

export {
    CreatePost,
    UpdatePostThumbnail,
    ImageBelongPost,
    GetPost,
    GetPosts
};