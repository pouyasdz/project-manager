const {TeamModel} = require("./../../models/team")
class TeamController{
    async createTeam(req, res, next){
        try {
            const {name, description, username} = req.body;
            const owner = req.user._id;
            const team = await TeamModel.create({
                name,
                description,
                username,
                owner
            })
            if(!team) throw {status:500, message: "ایجاد تیم با خطا مواجه شد"};
            return res.status(201).json({
                status:201,
                success:true,
                message:"تیم با موفقیت ایجاد شد"
            })
        } catch (error) {
            next(error)
        }
    }

    async getListOfTeam(req, res, next){
        try {
            const teams = await TeamModel.find({});
            return res.status(200).json({
                status:200,
                success:true,
                teams
            })
        } catch (error) {
            next(error)
        }
    }

    async getTeamByID(req, res, next){
        try {
            const teamID = req.params.id;
            const team = await TeamModel.findById(teamID);
            if(!team) throw {status:404, message:"شناسه نامعتبر"};
            return res.status(200).json({
                status:200,
                success:true,
                team
            })
        } catch (error) {
            next(error)
        }
    }

    async getMyTeams(req, res, next){
        try {
            const userID = req.user._id
            const teams = await TeamModel.find({
                $or :[
                    {owner : userID},
                    {users: userID}
                ]
            })
            return res.status(200).json({
                status:200,
                success:true,
                teams
            })
        } catch (error) {
            
        }
    }

    async removeTeamByID(req, res, next){
        try {
            const teamID = req.params.id;
            const teams = await TeamModel.findById(teamID);
            if(!teams) throw {status:404, message:"شناسه نامعتبر"};
            const result = await TeamModel.deleteOne({_id:teamID});
            if(result.deletedCount == 0) throw {status: 500, message:"حذف انجام نشد دوباره تلاش کنید"}
            return res.status(200).json({
                status:200,
                success:true,
                teams
            })
        } catch (error) {
            next(error)
        }
    }
    async inviteUserToTeam(){

    }
    async removeTeamById(){

    }
    async updateTeam(){

    }
    async removeUserFromTeam(){
        
    }
}

module.exports = {
    TeamController : new TeamController()
}