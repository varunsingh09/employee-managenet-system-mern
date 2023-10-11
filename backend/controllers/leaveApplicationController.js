const asyncHandler = require("express-async-handler");
const Employee = require("./../models/employee");
const LeaveApplication = require("./../models/leaveapplication");
const { LeaveapplicationValidation } = require("./../schema/");



const getLeaveApplication = asyncHandler(async (req, res) => {
    try {
        console.log(req.params.id);
        // var employee = {};
        // {path: 'projects', populate: {path: 'portals'}}
        const employee = await Employee.findById(req.params.id)
            // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
            .populate({
                path: "leaveApplication"
                // populate: {
                //   path: "state",
                //   model: "State",
                //   populate: {
                //     path: "country",
                //     model: "Country"
                //   }
                // }
            })
            // .select(" -role -position -department")
            .select("FirstName LastName MiddleName")

        res.status(200).send(employee);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});

const saveLeaveApplication = asyncHandler(async (req, res) => {
    try {
        const { error } = LeaveapplicationValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            const employee = await Employee.findById(req.params.id);
            if (employee) {
                let newleaveapplication;
                newleaveapplication = {
                    Leavetype: req.body.Leavetype,
                    FromDate: req.body.FromDate,
                    ToDate: req.body.ToDate,
                    Reasonforleave: req.body.Reasonforleave,
                    Status: req.body.Status,
                    employee: req.params.id
                };

                const leaveapplication = await LeaveApplication.create(newleaveapplication);
                if (leaveapplication) {

                    employee.leaveApplication.push(leaveapplication);
                    const employeeInfo = await employee.save();
                    if (employeeInfo) {
                        console.log(employeeInfo);
                        res.send(leaveapplication);
                    }
                }
                console.log("new leaveapplication Saved");
            }
        }
        console.log(req.body);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

const updateLeaveApplication = asyncHandler(async (req, res) => {
    try {
        const { error } = LeaveapplicationValidation.validate(req.body);
        if (error) {
            console.log(error);
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
            if (leaveapplication)
                res.send(newleaveapplication);
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
        Employee.findById({ _id: req.params.id }, async function (err, employee) {
            if (err) {
                res.send("error");
                console.log(err);
            } else {
                const leaveapplication = await LeaveApplication.findByIdAndRemove({ _id: req.params.id2 });
                if (leaveapplication) {
                    console.log("leaveapplication deleted");
                   const numberAffected = await Employee.updateOne(
                        { _id: req.params.id },
                        { $pull: { leaveapplication: req.params.id2 } });

                    console.log(numberAffected);
                    res.status(201).send(leaveapplication);

                }


                console.log("delete");
                console.log(req.params.id);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = {
    getLeaveApplication, saveLeaveApplication, updateLeaveApplication, deleteLeaveApplication
};
