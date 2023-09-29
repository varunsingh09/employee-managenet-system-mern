const mongoose = require("mongoose");
const  autoIncrement = require("mongoose-auto-increment");

/////////////////familyInfo
var familyInfoSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Relationship: { type: String, required: true },
    dob: { type: Date, required: true },
    Occupation: { type: String, required: true }
});
familyInfoSchema.plugin(autoIncrement.plugin, {
    model: "FamilyInfo",
    field: "FamilyInfoID"
});

const FamilyInfo = mongoose.model("FamilyInfo", familyInfoSchema);

module.exports=FamilyInfo