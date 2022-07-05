const {body} = require("express-validator")
const { UserModel } = require("../../models/user")
function registerValidator(){
    return [
        body("username").custom(async(value, ctx)=>{
            if(value){
                const usernameRegex = /^[a-z]+[a-z09\_\.]{2,}/gi
                if(usernameRegex.test(value)){
                   const user = await UserModel.findOne({username:value})
                   if(user) throw "نام کاربری تکراری میباشد";
                    return true
                }
                throw "نام کاربری صحیح نمیباشد"
            }throw "نام کاربری نمیتواند خالی باشد"
        }),
        body("email").isEmail().withMessage('ایمیل وارد شده صحیح نمیباشد')
        .custom(async email=>{
            const user = await UserModel.findOne({email})
            if(user) throw "ایمیل وارد شده قبلا وارد شده است";
            return true
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("شماره مبایل وارد شده صحیح نمیباشد")
        .custom(async mobile=>{
            const user = await UserModel.findOne({mobile})
            if(user) throw "شماره مبایل قبلا وارد شده";
            return true
        }),
        body("password").isLength({min:6, max:16}).withMessage('رمز عبور حداقل باید 6 و حد اکثر 16 نویسه باشد')
        .custom((value, ctx)=>{
            if(!value) throw "رمز عبور نمیتواند خالی باشد";
            if(value !== ctx?.req?.body?.confirm_password) throw "رمز عبور با هم یکسان نیست";
            return true
        })


    ]
}


module.exports = {
    registerValidator
}