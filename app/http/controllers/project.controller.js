const autoBind = require("auto-bind");
const { ProjectModel } = require("../../models/project");

class ProjectController {

  constructor(){
    autoBind(this)
  }

  async creatProject(req, res, next) {
    try {
      const owner = req.user._id;
      const { title, text, image, tags } = req.body;
      const result = await ProjectModel.create({
        title,
        text,
        owner,
        image,
        tags,
      });
      if (!result) throw { status: 400, message: "افزودن پروژه انجام نشد" };
      return res.status(201).json({
        status: 201,
        success: true,
        message: "پروژه با موفقیت ایجاد شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projects = await ProjectModel.find({ owner });
      return res.status(200).json({
        status: 200,
        success: true,
        projects,
      });
    } catch (error) {
      next(error);
    }
  }
  async findProject(projectID, owner){
    try {
      const project = await ProjectModel.findOne({ owner, _id: projectID });
      if (!project) throw { status: 404, message: "پروژه یافت نشد" };
      return project
      
    } catch (error) {
      console.log("error");
    }
  }
async getProjectById(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      const project = await this.findProject(projectID, owner);
      return res.status(200).json({
        status: 200,
        success: true,
        project,
      });
    } catch (error) {
      next(error);
    }
  }
  async removeProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      await this.findProject(projectID, owner);
      const deletProjectResult = await ProjectModel.deleteOne({_id:projectID})
      if(deletProjectResult.deletedCount == 0) throw {status:400, message:" پروژه حذف نشد "}
      return res.status(200).json({
        status:200,
        success:true,
        message:" با موفقیت حذف شد "
      })
    } catch (error) {
      next(error)   
    }
  }
  async getAllProjectOfTeam() {}
  async getProjectOfUser() {}
  async updateProject() {}
}

module.exports = {
  ProjectController: new ProjectController(),
};
