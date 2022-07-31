const { ProjectController } = require("../http/controllers/project.controller");
const { checkLogin } = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");
const { createProjectValidator } = require("../http/validations/project");
const { uploadFile } = require("../modules/express-fileUpload");
const fileUpload = require("express-fileupload");
const { mongoIDValidator } = require("../http/validations/public");
const router = require("express").Router();

router.post(
  "/create",
  fileUpload(),
  checkLogin,
  uploadFile,
  createProjectValidator(),
  expressValidatorMapper,
  ProjectController.creatProject
);

router.post("/list", checkLogin,ProjectController.getAllProject)
router.post("/:id", checkLogin ,mongoIDValidator(), expressValidatorMapper, ProjectController.findProject)
router.post("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.removeProject)
router.post("/edit/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, ProjectController.updateProject)

module.exports = {
  projectRoutes: router,
};
