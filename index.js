const Application = require("./app/server");
const DB_ULR = "mongodb://localhost:27017/ProjectManager"
new Application(3000, DB_ULR)