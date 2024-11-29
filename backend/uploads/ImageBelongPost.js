import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const postId = req.params.id;
        if (!postId) {
            return cb(new Error("postId is required"), null);
        }

        const imagePost = path.resolve(`../frontend/public/upload/posts/${postId}/images`);
        fs.mkdirSync(imagePost, { recursive: true });
        cb(null, imagePost); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage });

export const UploadMultiple = upload.array("file", 50);

export const ImageBelongPost = (req, res) => {
    const { temp_image_path } = req.body; 
    const postId = req.params.id;

    if (!temp_image_path || !postId) {
        return res.status(400).json({ message: "Temp image path and postId are required" });
    }

    const tempPath = path.resolve(`../frontend/public${temp_image_path}`);
    const destPath = path.resolve(`../frontend/public/upload/posts/${postId}/images`);

    if (!fs.existsSync(tempPath)) {
        console.error(`Source file not found: ${tempPath}`);
        return res.status(404).json({ message: "Source file does not exist" });
    }

    fs.mkdirSync(destPath, { recursive: true });

    const fileName = path.basename(temp_image_path); 
    const newPath = path.join(destPath, fileName); 

    fs.rename(tempPath, newPath, (err) => {
        if (err) {
            console.error("Error moving file:", err);
            return res.status(500).json({ message: "Error moving file" });
        }

        const newImagePath = `/upload/posts/${postId}/images/${fileName}`;

        const des = req.body.des || '';  

        const updatedDes = des.replace(temp_image_path, newImagePath);

        return res.status(200).json({
            image_path: [newImagePath], 
            updated_des: updatedDes,  
        });
    });
};
