const { UserModel } = require("../../models/user");
const { hashSrting, tokenGenerator } = require("../../modules/functions");
const bcrypt = require('bcrypt')
class AuthController {
  async register(req, res, next) {
    try {
        let {username, password, email, mobile} = req.body;
        username = username.toLowerCase()
        const hash_password = hashSrting(password);

        const user = await UserModel.create({
            username,
            email,
            mobile,
            password:hash_password
        })
        return res.status(201).json({
          status:201,
          success:true,
          message:'با موفقیت ثبت شد'
        })
    } catch (error) {
        next(error)
    }
  }
  async login(req, res, next) {
    try {
      const {username, password} = req.body;
      const user = await UserModel.findOne({username});
      if(!user) throw {status: 401, message:'نام کاربری یا رمز عبور اشتباه میباشد'};
      const compareResualt = bcrypt.compareSync(password, user.password)
      if(!compareResualt) throw {status:401, message:"نام کاربری یا رمز عبور اشتباه میباشد"};
      const token = tokenGenerator({username});
      user.token = token;
      await user.save()
      return res.status(200).json({
        status:200,
        success:true,
        message:'شما با موفقیت وارد شدید',
        token
      })
    } catch (error) {
      next(error)
    }
  }
  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
