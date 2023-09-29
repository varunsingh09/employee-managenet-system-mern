const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const citySchema = new mongoose.Schema({
    CityName: { type: String, required: true },
    state: [{ type: mongoose.Schema.Types.ObjectId, ref: "State" }]
});
citySchema.plugin(autoIncrement.plugin, {
    model: "Company",
    field: "CompanyID"
});

const City = mongoose.model("City", citySchema);
module.exports = City

