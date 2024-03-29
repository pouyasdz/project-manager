const { tokenJwtVerify } = require("../../modules/functions");
const { UserModel } = require("../../models/user");
const checkLogin = async (req, res, next) => {
  try {
    let authError = { status: 401, message: "لطفا وارد حساب کاربری خود شوید" };
    const authorization = req?.headers?.authorization;
    if (!authorization) throw authError;
    let token = authorization.split(" ")?.[1];
    if (!token) throw authError;

    const result = tokenJwtVerify(token);
    const { username } = result;
    const user = await UserModel.findOne({ username }, { password: 0 });

    const validation = user.token == token
    if(!validation) throw authError;

    if (!user) throw authError;
    req.user = user;
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkLogin,
};
// throw {message:"مشکل اینجاست"}
