const { body, param } = require("express-validator");
const { TeamModel } = require("../../models/team");

function createTeamValidator(){
    return [
        body("name").isLength({min:5}).withMessage("نام تیم نمیتواند کمتر از 5 نویسه باشد"),
        body("description").notEmpty().withMessage("نمیتواند توضحات خالی باشد"),
        body("username").custom(async(username)=>{
            const usernameRegep = /^[a-z]+[a-z0-9\_\.]{3,}$/gim
            if(usernameRegep.test(username)){
                const team = await TeamModel.findOne({username});
                if(team) throw " نام تیم قبلا استفاده شده "
                return true
            }
                throw "نام کاربری را به طور صحیح وارد کنید"
        })
    ]
}


module.exports = {
    createTeamValidator
}