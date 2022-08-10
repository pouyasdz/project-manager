const router = require('express').Router();
const { TeamController } = require('../http/controllers/team.controller');
const {checkLogin} = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { mongoIDValidator } = require('../http/validations/public');
const { createTeamValidator } = require('../http/validations/team');

router.post("/create", checkLogin, createTeamValidator(), expressValidatorMapper, TeamController.createTeam);
router.get("/list", checkLogin, expressValidatorMapper, TeamController.getListOfTeam);
router.get("/me", checkLogin, TeamController.getMyTeams);
router.get("/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, TeamController.getTeamByID);
router.delete("/remove/:id", checkLogin, mongoIDValidator(), expressValidatorMapper, TeamController.getTeamByID);


module.exports ={
    teamRoutes : router
}