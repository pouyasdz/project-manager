const mongoose = require("mongoose")
const ProjectSchema = new mongoose.Schema({
    title : {type : String, required : true},
    preView:{type: String},
    text : {type : String},
    image : {type :String, default:'/defaults/default.png'},
    tags : {type :[mongoose.Types.ObjectId], default:[]},
    owner : {type : mongoose.Types.ObjectId, required:true},
    team : {type : mongoose.Types.ObjectId},
    private : {type : Boolean, default:true},
    tags : {type : [String], default:[]}
},{timestamps: true})

const ProjectModel = mongoose.model("project", ProjectSchema);
module.exports ={
    ProjectModel
}