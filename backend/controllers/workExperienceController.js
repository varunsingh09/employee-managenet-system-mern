const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const Employee = require("./../models/employee");
const WorkExperience = require("./../models/workexperience");
const { WorkexperienceValidation } = require("./../schema/");



const getWorkExperience = asyncHandler(async (req, res) => {
    console.log(req.params.id);
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    Employee.findById(req.params.id)
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "workexperience"
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
            res.send(employee);
        });
});

const saveWorkExperience = asyncHandler(async (req, res) => {
    Joi.validate(req.body, WorkexperienceValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            Employee.findById(req.params.id, function (err, employee) {
                if (err) {
                    console.log(err);
                    res.send("err");
                } else {
                    let newworkexperience;

                    newworkexperience = {
                        CompanyName: req.body.CompanyName,
                        Designation: req.body.Designation,
                        FromDate: req.body.FromDate,
                        ToDate: req.body.ToDate
                    };

                    WorkExperience.create(newworkexperience, function (
                        err,
                        workexperience
                    ) {
                        if (err) {
                            console.log(err);
                            res.send("error");
                        } else {
                            employee.workexperience.push(workexperience);
                            employee.save(function (err, data) {
                                if (err) {
                                    console.log(err);
                                    res.send("err");
                                } else {
                                    console.log(data);
                                    res.send(workexperience);
                                }
                            });
                            console.log("new workexperience Saved");
                        }
                    });
                    console.log(req.body);
                }
            });
        }
    });
});

const updateWorkExperience = asyncHandler(async (req, res) => {
    Joi.validate(req.body, WorkexperienceValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newworkexperience;

            newworkexperience = {
                CompanyName: req.body.CompanyName,
                Designation: req.body.Designation,
                FromDate: req.body.FromDate,
                ToDate: req.body.ToDate
            };

            WorkExperience.findByIdAndUpdate(
                req.params.id,
                newworkexperience,
                function (err, workexperience) {
                    if (err) {
                        res.send("error");
                    } else {
                        res.send(newworkexperience);
                    }
                }
            );
        }
        console.log("put");
        console.log(req.body);
    });
});

const deleteWorkExperience = asyncHandler(async (req, res) => {
    Employee.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
            res.send("error");
            console.log(err);
        } else {
            WorkExperience.findByIdAndRemove({ _id: req.params.id2 }, function (
                err,
                workexperience
            ) {
                if (!err) {
                    console.log("workexperience deleted");
                    Employee.update(
                        { _id: req.params.id },
                        { $pull: { workexperience: req.params.id2 } },
                        function (err, numberAffected) {
                            console.log(numberAffected);
                            res.send(workexperience);
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
    getWorkExperience, saveWorkExperience, updateWorkExperience, deleteWorkExperience
};
