import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const tempFolder = path.resolve('../frontend/public/upload/temp');
        fs.mkdirSync(tempFolder, { recursive: true }); 
        cb(null, tempFolder);  
    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            cb(new Error('Only image files are allowed'), false);
        } else {
            cb(null, true);
        }
    }
});


export const UploadTempImage = upload.array('file', 50);  

export const TempImagePost = (req, res) => {
    UploadTempImage(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            console.error('Multer Error:', err);
            return res.status(500).json({ message: "Multer Error", error: err });
        } 
        else if (err) {
            console.error('Multer Error:', err);
            return res.status(500).json({ message: "Server Error", error: err });
        }

        const files = req.files;  

        if (files && files.length > 0) {
            const imagePaths = files.map(file => `/upload/temp/${file.filename}`);
            return res.status(200).json({ image_path: imagePaths });
        } 
        else {
            return res.status(500).json({ message: "No files uploaded" });
        }
    });
};
