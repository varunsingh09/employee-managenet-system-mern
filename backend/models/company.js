const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    Address: { type: String, required: true },
    PostalCode: { type: Number, required: true },
    Website: { type: String, required: true },
    email: { type: String, required: true },
    ContactPerson: { type: String, required: true },
    contactno: { type: String, required: true },
    FaxNo: { type: String, required: true },
    PanNo: { type: String, required: true },
    GSTNo: { type: String, required: true },
    CINNo: { type: String, required: true },
    deleted: { type: Boolean },
    city: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }]
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company


