const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

function createUploadPathDir(){
    let date = new Date()
    const Year = String(date.getFullYear());
    const Month = String(date.getMonth());
    const day = String(date.getDate());

    const uploadPath = path.join(__dirname, ".." ,".." , "public", "upload", Year, Month, day);
    fs.mkdirSync(uploadPath, {recursive : true});
    return path.join("public", "upload", Year, Month, day)
}

function hashSrting(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
}

function tokenGenerator(payload){
    const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: "365 days"})
    return token
}

function tokenJwtVerify(token){
    const result = jwt.verify(token, process.env.SECRET_KEY);
    if(!result?.username) throw {status:401, message:'لطفا وارد حساب کاربری خود شوید'}
    return result
}

module.exports = {
    hashSrting,
    tokenGenerator,
    tokenJwtVerify,
    createUploadPathDir
}