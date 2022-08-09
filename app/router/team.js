const router = require('express').Router();
const { TeamController } = require('../http/controllers/team.controller');
const {checkLogin} = require("../http/middlewares/autoLogin");
const { expressValidatorMapper } = require('../http/middlewares/checkErrors');
const { createTeamValidator } = require('../http/validations/team');

router.post("/create", checkLogin, createTeamValidator(), expressValidatorMapper, TeamController.createTeam)
router.get("/list-of-team", checkLogin, expressValidatorMapper, TeamController.getListOfTeam)


module.exports ={
    teamRoutes : router
}