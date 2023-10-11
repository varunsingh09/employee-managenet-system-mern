const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

var positionSchema = new mongoose.Schema({
    PositionName: { type: String, required: true },
    company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
});
positionSchema.plugin(autoIncrement.plugin, {
    model: "Position",
    field: "PositionID"
});

var Position = mongoose.model("Position", positionSchema);
module.exports = Position