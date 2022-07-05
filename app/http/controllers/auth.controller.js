const { UserModel } = require("../../models/user");
const { hashSrting } = require("../../modules/functions");

class AuthController {
  async register(req, res, next) {
    try {
        const {username, password, email, mobile} = req.body;
        const hash_password = hashSrting(password);

        const user = await UserModel.create({
            username,
            email,
            mobile,
            password:hash_password
        })
        return res.json(user)
    } catch (error) {
        next(error)
    }
  }
  login() {}
  resetPassword() {}
}

module.exports = {
  AuthController: new AuthController(),
};
