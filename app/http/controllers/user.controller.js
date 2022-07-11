const { UserModel } = require("../../models/user");

class UserController {
    getProfile(req, res, next){
        try {
            const user = req.user;
            return res.status(200).json({
                status:200,
                success:true,
                user
            })
        } catch (error) {
            next(error)
        }
    }
    async editProfile(req, res, next){
        try {
            let data = {...req.body};
            const userID = req.user._id
            let fields = ["first_name", "last_name", "skills"];
            let badValue = ["", " ", null, undefined, 0, -1, NaN];
            console.log(data);
            Object.entries(data).forEach(([key, value])=>{
                if(!fields.includes(key)) delete data[key];
                if(badValue.includes(value)) delete data[key];

            })
            console.log(data);
            const result = await UserModel.updateOne({_id:userID}, {$set: data})
            if(result.modifiedCount > 0){
                return res.status(200).json({
                    status:200,
                    success:true,
                    message:"به روز رسانی پروفایل با موفقیت انجام شد"
                })
                

            }
            throw {status:400, message: "به روز رسانی انجام نشد"}
        } catch (error) {
            next(error)
        }
    }
    addSkills(){

    }
    editSkills(){

    }
    acceptInviteInTeam(){

    }
    rejectInviteInTeam(){

    }
}

module.exports = {
    UserController : new UserController()
}