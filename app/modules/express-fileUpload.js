const path = require('path');
const { createUploadPathDir } = require('./functions');
const uploadFile = async (req, res, next) => {
    try {
        if(Object.keys(req.files).length == 0) throw {status:400, message:"تصویر شاخص پروژه را ارسال کنید"}
        let image = req.files.image;
        let type = path.extname(image.name);
        const trueType = [".png", ".jpg", ".webp", ".gif"];
        if(!trueType.includes(type)) throw {status:400, message:" فرمت ارسال شده تصویر صحیح نمیباشد"}
        const image_path = path.join(createUploadPathDir(), Date.now()+ path.extname(image.name))
        req.body.image = image_path.substring(7)
        let uploadPath = path.join(__dirname, "..","..",image_path);
        image.mv(uploadPath, (err)=>{
            if(err) throw {status:500, message : "بارگذاری انجام نشد"}
            next()
        })
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    uploadFile
}