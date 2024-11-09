import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const postId = req.params.id;
        console.log(postId)  
        if (!postId) {
            return cb(new Error("postId is required"), null);  
        }

        const postThumbnail = path.resolve(`../frontend/public/upload/posts/${postId}/thumbnail`);

        fs.mkdirSync(postThumbnail, { recursive: true });

        cb(null, postThumbnail);
    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

export const UploadSingle = upload.single("file");

export const PostThumbnail = (req, res) => {
    UploadSingle(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } 
        else if (err) {
            return res.status(500).json(err);
        }
        const file = req.file;
        return res.status(200).json(file.filename);
    });
};
