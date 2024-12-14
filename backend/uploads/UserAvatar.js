import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.resolve('../frontend/public/upload/clients/img'));
    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

export const UploadSingle = upload.single("file");

export const UserAvatar = (req, res) => {
    UploadSingle(req, res, function(err){
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } 
        else if (err){
            return res.status(500).json(err);
        }
        const file = req.file;
        return res.status(200).json(file.filename);
    });
};
