const multer = require('multer');
const { createUploadPathDir } = require('./functions');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, createUploadPathDir())

    },
    filename : (req, file, cb)=>{
        const typeFile = path.extname(file.originalname || "")
        cb(null, Date.now() + typeFile)
    }
});

const upload_multer = multer({storage});

module.exports = {
    upload_multer,
}