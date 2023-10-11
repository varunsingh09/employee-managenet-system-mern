const asyncHandler = require("express-async-handler");
const Employee = require("./../models/employee");
const LeaveApplication = require("./../models/leaveapplication");
const { LeaveApplicationHrValidation } = require("./../schema/index");



const getLeaveApplication = asyncHandler(async (req, res) => {
    try {
        // var employee = {};
        // {path: 'projects', populate: {path: 'portals'}}
        const leaveapplication = await LeaveApplication.find()
            // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
            .populate({
                path: "employee"
            })
            // .select(" -role -position -department")
            .select("FirstName LastName MiddleName")

        res.status(200).send(leaveapplication);
    } catch (err) {
        console.log('.....', err);
        res.status(500).send(err);
    }
});

const updateLeaveApplication = asyncHandler(async (req, res) => {
    try {
        const { error } = LeaveApplicationHrValidation.validate(req.body);
        if (error) {
            console.log(req.body, 'err', error);
            res.status(400).send(error.details[0].message);
        } else {
            let newleaveapplication;

            newleaveapplication = {
                Leavetype: req.body.Leavetype,
                FromDate: req.body.FromDate,
                ToDate: req.body.ToDate,
                Reasonforleave: req.body.Reasonforleave,
                Status: req.body.Status,
                employee: req.params.id
            };

            const leaveapplication = await LeaveApplication.findByIdAndUpdate(
                req.params.id,
                newleaveapplication);

            if (leaveapplication) {
                res.status(201).send(newleaveapplication);
            }
        }
        console.log("put");
        console.log(req.body);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

const deleteLeaveApplication = asyncHandler(async (req, res) => {
    try {
        const employee = await Employee.findById({ _id: req.params.id });
        if (employee) {
            const leaveapplication = await LeaveApplication.findByIdAndRemove({ _id: req.params.id2 })
            if (leaveapplication) {
                console.log("leaveapplication deleted");
                const emp = Employee.updateOne(
                    { _id: req.params.id },
                    { $pull: { leaveapplication: req.params.id2 } });
                if (emp) {
                    console.log(numberAffected);
                    res.send(leaveapplication);
                }
            }
        }
        console.log("delete");
        console.log(req.params.id);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = {
    getLeaveApplication, updateLeaveApplication, deleteLeaveApplication
};
