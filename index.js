const Application = require("./app/server");
const DB_ULR = "mongodb://localhost:27017/ProjectManager";
const cors = require('cors')
cors()
require('dotenv').config();
new Application(process.env.PORT || 3000, DB_ULR)