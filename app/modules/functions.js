const bcrypt = require('bcrypt')
function hashSrting(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
}

module.exports = {
    hashSrting,
}