const autoBind = require("auto-bind");
const { ProjectModel } = require("../../models/project");
const { createLinkForFiles } = require("../../modules/functions");

class ProjectController {
  constructor() {
    autoBind(this);
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
      for(const project of projects){
        project.image = createLinkForFiles(project.image, req)
      }
      return res.status(200).json({
        status: 200,
        success: true,
        projects,
      });
    } catch (error) {
      next(error);
    }
  }
  async findProject(projectID, owner) {
    try {
      const project = await ProjectModel.findOne({ owner, _id: projectID });
      if (!project) throw { status: 404, message: "پروژه یافت نشد" };
      return project;
    } catch (error) {
      console.log("error");
    }
  }
  async getProjectById(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      const project = await this.findProject(projectID, owner);
      project.image = createLinkForFiles(project.image, req)

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
      const deletProjectResult = await ProjectModel.deleteOne({
        _id: projectID,
      });
      if (deletProjectResult.deletedCount == 0)
        throw { status: 400, message: " پروژه حذف نشد " };
      return res.status(200).json({
        status: 200,
        success: true,
        message: " با موفقیت حذف شد ",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProject(req, res, next) {
    try {
      const owner = req.user._id;
      const projectID = req.params.id;
      const project = await this.findProject(projectID, owner);
      const data = {...req.body};
      Object.entries(data).forEach(([key, value])=> {
        if(!["title", "text", "tags"].includes(key)) delete data[key];
        if(["", " ", 0, null, undefined, NaN].includes(value)) delete data[key];
        if(key == "tags"&& (data["tags"].constructor == Array)){
              data["tags"] = data["tags"].filter(val => {
                if(!["", " ", 0, null, undefined, NaN].includes(val)) return val
              })
        }
        if(data["tags"].length ===0 ) delete data["tags"]
      })

      const updateResult = await ProjectModel.updateOne({_id : projectID}, {$set : data})
      if(updateResult.modifiedCount == 0) throw {status:400, message:"به روز رسانی انجام نشد"}
      return res.status(200).json({
        status:200,
        success:true,
        message:"بروزرسانی انجام شد"
      })
    } catch (error) {
      next(error)
    }
  }
  async updateProjectImage(req, res, next){
    try {
      const {image} = req.body;
      const owner = req.user._id;
      const projectID = req.params.id;

      await this.findProject(projectID, owner);
      const updateResult =  await ProjectModel.updateOne({_id:projectID}, {$set : {image}});

      if(updateResult.modifiedCount == 0) throw {status:400, message: "بروزرسانی انجام نشد"};

      return res.status(200).json({
        status:200,
        success:true,
        message:"بروزرسانی انجام شد"
      });
    } catch (error) {
      next(error)
    }
  }
  async getAllProjectOfTeam() {}
  async getProjectOfUser() {}
}

module.exports = {
  ProjectController: new ProjectController(),
};
