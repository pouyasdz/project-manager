const { ProjectController } = require('../http/controllers/project.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { createProjectValidator } = require('../http/validations/project');

const router = require('express').Router();

router.post("/create",checkLogin ,createProjectValidator(), expressValidatorMapper,ProjectController.creatProject)

module.exports ={
    projectRoutes : router
}