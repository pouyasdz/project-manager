const { AuthController } = require('../http/controllers/auth.controller');
const { registerValidator } = require('../http/validations/auth');
const { expressValidatorMapper} = require('../http/middlewares/checkErrors')
const router = require('express').Router();

router.post('/register',registerValidator(),expressValidatorMapper,AuthController.register)


module.exports ={
    authRoutes : router
}