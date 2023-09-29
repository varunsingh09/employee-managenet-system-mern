const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const Employee = require("./../models/employee");
const LeaveApplication = require("./../models/leaveapplication");
const { LeaveapplicationValidation } = require("./../schema/");



const getLeaveApplication = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    Employee.findById(req.params.id)
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "leaveapplication"
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
        .select("FirstName lastname middlename")
        .exec(function (err, employee) {
            // console.log(filteredCompany);
            if (err) {
                console.log(err);
                res.send("error");
            } else {
                res.send(employee);
            }
        });
});

const saveLeaveApplication = asyncHandler(async (req, res) => {
    Joi.validate(req.body, LeaveapplicationValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            Employee.findById(req.params.id, function (err, employee) {
                if (err) {
                    console.log(err);
                    res.send("err");
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

                    LeaveApplication.create(newleaveapplication, function (
                        err,
                        leaveapplication
                    ) {
                        if (err) {
                            console.log(err);
                            res.send("error");
                        } else {
                            employee.leaveapplication.push(leaveapplication);
                            employee.save(function (err, data) {
                                if (err) {
                                    console.log(err);
                                    res.send("err");
                                } else {
                                    console.log(data);
                                    res.send(leaveapplication);
                                }
                            });
                            console.log("new leaveapplication Saved");
                        }
                    });
                    console.log(req.body);
                }
            });
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
    getLeaveApplication, saveLeaveApplication, updateLeaveApplication, deleteLeaveApplication
};
