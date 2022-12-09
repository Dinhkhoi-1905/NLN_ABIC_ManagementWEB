const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const dbConfig = require("../../config/db.config.js");


const db = {};
mongoose.Promise = global.Promise;
db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.url = dbConfig.url;

db.nhanviens = require("./Nhanviens.js")(mongoose, mongoosePaginate);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;