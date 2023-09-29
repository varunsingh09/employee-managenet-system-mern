const mongoose = require("mongoose");
const  autoIncrement = require("mongoose-auto-increment");


var portalSchema = new mongoose.Schema({
    CreatedBy: { type: String },
    CreatedDate: { type: Date, default: Date.now },
    deleted: { type: Boolean },
    ModifiedBy: { type: String },
    ModifiedDate: { type: Date },
    PortalName: { type: String, required: true },
    Status: { type: Number, required: true }
});
portalSchema.plugin(autoIncrement.plugin, {
    model: "Portal",
    field: "ID"
});

var Portal = mongoose.model("Portal", portalSchema);
module.exports=Portal