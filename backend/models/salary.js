const mongoose = require("mongoose");
const  autoIncrement = require("mongoose-auto-increment");

var salarySchema = new mongoose.Schema({
    BasicSalary: { type: String, required: true },
    BankName: { type: String, required: true },
    accountNo: { type: String, required: true },
    accountHolderName: { type: String, required: true },
    IFSCcode: { type: String, required: true },
    TaxDeduction: { type: String, required: true }
});
salarySchema.plugin(autoIncrement.plugin, {
    model: "Salary",
    field: "SalaryID"
});

var Salary = mongoose.model("Salary", salarySchema);

module.exports=Salary
