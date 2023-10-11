const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const countrySchema = new mongoose.Schema({
    CountryName: { type: String, required: true },
    states: [{ type: mongoose.Schema.Types.ObjectId, ref: "State" }]
});
countrySchema.plugin(autoIncrement.plugin, {
    model: "Country",
    field: "CountryID"
});
const Country = mongoose.model("Country", countrySchema);

module.exports = Country