const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

var leaveapplicationSchema = new mongoose.Schema({
    Leavetype: { type: String, required: true },
    FromDate: { type: Date, required: true },
    ToDate: { type: Date, required: true },
    Reasonforleave: { type: String, required: true },
    Status: { type: String, required: true },
    employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }]
});
leaveapplicationSchema.plugin(autoIncrement.plugin, {
    model: "leaveapplication",
    field: "leaveapplicationID"
});

var leaveapplication = mongoose.model(
    "leaveapplication",
    leaveapplicationSchema
);

module.exports = leaveapplication