const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const Employee = require("./../models/employee");
const LeaveApplication = require("./../models/leaveapplication");
const { LeaveapplicationValidation } = require("./../schema/");



const getLeaveApplication = asyncHandler(async (req, res) => {
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    LeaveApplication.find()
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "employee"
        })
        // .select(" -role -position -department")
        // .select("FirstName lastname middlename"
        // )
        .exec(function (err, leaveapplication) {
            // console.log(filteredCompany);
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                res.send(leaveapplication);
            }
        });
});

const updateLeaveApplication = asyncHandler(async (req, res) => {
    Joi.validate(req.body, LeaveapplicationValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
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

            LeaveApplication.findByIdAndUpdate(
                req.params.id,
                newleaveapplication,
                function (err, leaveapplication) {
                    if (err) {
                        res.send("error");
                    } else {
                        res.send(newleaveapplication);
                    }
                }
            );
        }
        console.log("put");
        console.log(req.body);
    });
});

const deleteLeaveApplication = asyncHandler(async (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send("error");
            console.log(err);
        } else {
            LeaveApplication.findByIdAndRemove({ _id: req.params.id2 }, function (
                err,
                leaveapplication
            ) {
                if (!err) {
                    console.log("leaveapplication deleted");
                    Employee.update(
                        { _id: req.params.id },
                        { $pull: { leaveapplication: req.params.id2 } },
                        function (err, numberAffected) {
                            console.log(numberAffected);
                            res.send(leaveapplication);
                        }
                    );
                } else {
                    console.log(err);
                    res.send("error");
                }
            });
            console.log("delete");
            console.log(req.params.id);
        }
    });
});

module.exports = {
    getLeaveApplication, updateLeaveApplication, deleteLeaveApplication
};
