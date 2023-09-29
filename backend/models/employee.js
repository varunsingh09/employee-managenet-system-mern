const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const employeeSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    middlename: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date },
    dateofjoining: { type: Date },
    terminatedate: { type: Date },
    deleted: { type: Boolean },
    photo: { type: String },
    contactno: { type: String },
    employeecode: { type: String, required: true },
    account: { type: Number },
    role: [{ type: mongoose.Schema.Types.ObjectId, ref: "Role" }],
    position: [{ type: mongoose.Schema.Types.ObjectId, ref: "Position" }],
    department: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
    salary: [{ type: mongoose.Schema.Types.ObjectId, ref: "Salary" }],
    education: [{ type: mongoose.Schema.Types.ObjectId, ref: "Education" }],
    familyInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "FamilyInfo" }],
    workexperience: [
        { type: mongoose.Schema.Types.ObjectId, ref: "workexperience" }
    ],
    leaveapplication: [
        { type: mongoose.Schema.Types.ObjectId, ref: "leaveapplication" }
    ],
    bloodgroup: { type: String },
    emergencycontactno: { type: String },
    hobbies: { type: String },
    pancardno: { type: String },
    permanetaddress: { type: String },
    presentaddress: { type: String }
});
employeeSchema.plugin(autoIncrement.plugin, {
    model: "Employee",
    field: "EmployeeID"
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;