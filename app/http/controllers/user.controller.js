const { UserModel } = require("../../models/user");
const { createLinkForFiles } = require("../../modules/functions");

class UserController {
  getProfile(req, res, next) {
    try {
      const user = req.user;
      user.profile_image = createLinkForFiles(user.profile_image, req);
      return res.status(200).json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async editProfile(req, res, next) {
    try {
      let data = { ...req.body };
      const userID = req.user._id;
      let fields = ["first_name", "last_name", "skills"];
      let badValue = ["", " ", null, undefined, 0, -1, NaN];

      Object.entries(data).forEach(([key, value]) => {
        if (!fields.includes(key)) delete data[key];
        if (badValue.includes(value)) delete data[key];
      });

      const result = await UserModel.updateOne({ _id: userID }, { $set: data });
      if (result.modifiedCount > 0) {
        return res.status(200).json({
          status: 200,
          success: true,
          message: "به روز رسانی پروفایل با موفقیت انجام شد",
        });
      }
      throw { status: 400, message: "به روز رسانی انجام نشد" };
    } catch (error) {
      next(error);
    }
  }

  async uploadProfileImage(req, res, next) {
    try {
      const userID = req.user._id;
      const filePath = req.file.path.substring(7);
      const result = await UserModel.updateOne(
        { _id: userID },
        { $set: { profile_image: filePath } }
      );
      if (result.matchedCount == 0)
        throw { status: 400, message: "بروز رسانی انجام نشد" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "بروز رسانی انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async addSkills(req, res, next) {
    try {
      const userID = req.user._id;
      const skills = req.body.skills;
      const resualt = await UserModel.updateOne(
        { _id: userID },
        { $set: { skills } }
      );
      if (resualt.modifiedCount == 0)
        throw { status: 400, message: "بروزرسانی انجام نشد" };
      return res.status(200).json({
        status: 200,
        success: true,
        message: "بروز رسانی انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllRequest(req, res, next) {
    try {
      const userID = req.user._id;
      const inviteRequests = await UserModel.aggregate([
        {
          $match :{
            _id:userID
          }
        },
        {
          $project:{inviteRequests:1}
        },
        {
          $lookup:{
            from:"users",
            localField:"inviteRequests.caller",
            foreignField:"username",
            as:"inviteRequests"
          }
        },
      ])
    
      return res.json({
        requests,
      });
    } catch (error) {
      next(error);
    }
  }
  async getRequestsByStatus(req, res, next) {
    try {
      const { status } = req.params;
      const userID = req.user._id;

      const requests = await UserModel.aggregate([
        {
          $match: { _id: userID },
        },
        {
          $project: {
            inviteRequests: 1,
            _id: 0,
            inviteRequests: {
              $filter: {
                input: "$inviteRequests",
                as: "request",
                cond: {
                  $eq: ["$$request.status", status],
                },
              },
            },
          },
        },
      ]);

      return res.status(200).json({
        status: 200,
        success: true,
        requests: requests?.[0]?.inviteRequests || [],
      });
    } catch (error) {
      next(error);
    }
  }
  async getPendingRequests(req, res, next) {
    try {
    } catch (error) {}
  }
  async getAcceptedRequests(req, res, next) {
    try {
    } catch (error) {}
  }
  async acceptInviteInTeam(req, res, next) {
    try {
      const {id, status} = req.params;
      const requests = await UserModel.findOne({"inviteRequests._id":id});
      
      if(!requests) throw {status:404, message:"درخواستی با این مشخصات پیدا نشد"}
      const findRequests = requests.inviteRequests.find(item => item.id == id);
      
      if(findRequests.status !== "pending") throw {status:400, message:"این درخواست قبلا رد یا پذیرفته شده است"};
      if(!["accepted", "rejected"].includes(status)) throw {status:400, message:"اطلاعات ارسال شده صحیح نمیباشد"};
      
      const updateResult = await UserModel.updateOne({"inviteRequests._id":id},{
        $set :{"inviteRequests.$.status":status}
      })
      
      if(updateResult.modifiedCount == 0) throw {status:500, message:"تغیر وضعیت درخواست انجام نشد"}
      return res.status(200).json({
        status:200,
        success:true,
        message:"تغیر وضعیت با موفقیت انجام شد"
      })
    } catch (error) {
      next(error)
    }
  }
  async rejectInviteInTeam(req, res, next) {
    try {
      
    } catch (error) {
      next(error)
    }
  }
  editSkills() {}
}

module.exports = {
  UserController: new UserController(),
};
