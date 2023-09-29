const mongoose = require("mongoose");
const  autoIncrement = require("mongoose-auto-increment");

var workexperienceSchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    Designation: { type: String, required: true },
    FromDate: { type: Date, required: true },
    ToDate: { type: Date, required: true }
});
workexperienceSchema.plugin(autoIncrement.plugin, {
    model: "workexperience",
    field: "workexperienceID"
});

const Workexperience = mongoose.model("workexperience", workexperienceSchema);
module.exports=Workexperience;
