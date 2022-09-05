const { AuthController } = require("../http/controllers/auth.controller");
const {
  registerValidator,
  loginValidation,
} = require("../http/validations/auth");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { checkLogin } = require("../http/middlewares/autoLogin");
const router = require("express").Router();

router.post(
  "/register",
  registerValidator(),
  expressValidatorMapper,
  AuthController.register
);
router.post(
  "/login",
  loginValidation(),
  expressValidatorMapper,
  AuthController.login
);
router.get("/logout", checkLogin, AuthController.logout);
module.exports = {
  authRoutes: router,
};
