const autoBind = require("auto-bind");
const { UserModel } = require("../../models/user");
const { TeamModel } = require("./../../models/team");
class TeamController {
  constructor(){
    autoBind(this)
  }
  async createTeam(req, res, next) {
    try {
      const { name, description, username } = req.body;
      const owner = req.user._id;
      const team = await TeamModel.create({
        name,
        description,
        username,
        owner,
      });
      if (!team) throw { status: 500, message: "ایجاد تیم با خطا مواجه شد" };
      return res.status(201).json({
        status: 201,
        success: true,
        message: "تیم با موفقیت ایجاد شد",
      });
    } catch (error) {
      next(error);
    }
  }

  async getListOfTeam(req, res, next) {
    try {
      const teams = await TeamModel.find({});
      return res.status(200).json({
        status: 200,
        success: true,
        teams,
      });
    } catch (error) {
      next(error);
    }
  }

  async getTeamByID(req, res, next) {
    try {
      const teamID = req.params.id;
      const team = await TeamModel.findById(teamID);
      if (!team) throw { status: 404, message: "شناسه نامعتبر" };
      return res.status(200).json({
        status: 200,
        success: true,
        team,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMyTeams(req, res, next) {
    try {
      const userID = req.user._id;
      const teams = await TeamModel.aggregate([
        {
        $match:{
            $or: [{ owner: userID }, { users: userID }],
        },
      },
      {
        $lookup:{
          from :"users",
          localField:"owner",
          foreignField:"_id",
          as:"owner"
        }
      },
      {
        $project:{
         "owner.username":1,
         "owner.mobile":1,
         "owner.email":1
        }
      },
      {
        $unwind :"$owner"
      }
      
        
      ]);
      return res.status(200).json({
        status: 200,
        success: true,
        teams,
      });
    } catch (error) {
      next(error);
    }
  }

  async removeTeamByID(req, res, next) {
    try {
      const teamID = req.params.id;
      const teams = await TeamModel.findById(teamID);
      if (!teams) throw { status: 404, message: "شناسه نامعتبر" };
      const result = await TeamModel.deleteOne({ _id: teamID });
      if (result.deletedCount == 0)
        throw { status: 500, message: "حذف انجام نشد دوباره تلاش کنید" };
      return res.status(200).json({
        status: 200,
        success: true,
        teams,
      });
    } catch (error) {
      next(error);
    }
  }

  async findUserInTeam(teamID, userID) {
    const result = await TeamModel.findOne({
      $or: [{ owner: userID }, { users: userID }],
      _id: teamID,
    });
    return !!result;
  }

  async inviteUserToTeam(req, res, next) {
    try {
      const userID = req.user._id;
      const { username, teamID } = req.params;

      const team = await this.findUserInTeam(teamID, userID);
      if (!team) throw { status: 400, message: "تیمی جهت دعوت وجود ندارد" };

      const user = await UserModel.findOne({ username });
      if (!user)
        throw { status: 400, message: "کاربر مورد نظر جهت دعوت وجود ندارد" };

      const userInvited = await this.findUserInTeam(teamID, user._id);
      if (userInvited)
        throw { status: 400, message: "فرد مورد نظر قبلا به تیم دعوت شده" };
        const request = {
          caller: req.user.username,
          requestDate: new Date(),
          teamID,
          status: "pending",
        };
    const updateUserResult = await UserModel.updateOne({username},{$push:{inviteRequests: request}})
    if(updateUserResult.modifiedCount == 0) throw {status:500, message:"ثبت درخواست انجام نشد"};
    return res.status(200).json({
      status:200,
      success:true,
      message:"ثبت درخواست با موفقیت انجام شد"
    })
    } catch (error) {
      next(error);
    }
  }
  async updateTeam(req, res, next) {
    try {
      const data = {...req.body};
      Object.keys(data).forEach(key => {
        if(!data[key]) delete[key];
        if(["", " ", undefined, null, NaN].includes(data[key])) delete[key];
      })
      const userID = req.user._id;
      const {teamID} = req.params;
      const team = await TeamModel.findOne({owner:userID, _id:teamID})

      if(!team) throw {status:404, message:"تیمی با این  مشخصات وجود ندارد"}
      const teamEditResult = await TeamModel.updateOne({_id:teamID},{
        $set: data
      })

      if(teamEditResult.modifiedCount == 0)throw {status:500, message:"بروزرسانی انجام نشد"}

      return res.status(200).json({
        status:200,
        success:true,
        message:"بروزرسانی با موفقیت انجام شد"
      })
    } catch (error) {
      next(error)
    }
  }
  async removeUserFromTeam(req, res, next) {
    try {
      
    } catch (error) {
      next(error)
    }
  }
 
}


module.exports = {
  TeamController: new TeamController(),
};
