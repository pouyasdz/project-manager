const { ProjectModel } = require("../../models/project");

class ProjectController{
    async creatProject(req, res, next){
        try {
            const owner = req.user._id;
            const {title, text} = req.body;
            const result = await ProjectModel.create({title, text, owner})
            if(!result) throw {status:400, message:'افزودن پروژه انجام نشد'}
            return res.status(201).json({
                status:201,
                success:true,
                message : 'پروژه با موفقیت ایجاد شد'
            })
        } catch (error) {
            next(error)
        }
    }
    getAllProject(){

    }
    getProjectById(){

    }
    getAllProjectOfTeam(){

    }
    getProjectOfUser(){

    }
    updateProject(){

    }
    removeProject(){

    }
}

module.exports = {
    ProjectController : new ProjectController()
}