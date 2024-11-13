import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const postId = req.params.id;
        console.log(postId);  
        if (!postId) {
            return cb(new Error("postId is required"), null);  
        }

        const imagePost = path.resolve(`../frontend/public/upload/posts/${postId}/images`);
        fs.mkdirSync(imagePost, { recursive: true });

        cb(null, imagePost);
    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage });

export const UploadMultiple = upload.array("file", 50);

export const ImageBelongPost = (req, res) => {
    UploadMultiple(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } 
        else if (err) {
            return res.status(500).json(err);
        }
        const files = req.files;

        if (files && files.length > 0) {
            const fileNames = files.map(file => file.filename);  
            return res.status(200).json({ image_path: fileNames });
        } 
        else {
            return res.status(500).json({ message: "No files uploaded" });
        }
    });
};
