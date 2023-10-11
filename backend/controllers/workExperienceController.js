const asyncHandler = require("express-async-handler");
const Employee = require("./../models/employee");
const WorkExperience = require("./../models/workexperience");
const { WorkexperienceValidation } = require("./../schema/");



const getWorkExperience = asyncHandler(async (req, res) => {
    try {
        console.log(req.params.id);
        // var employee = {};
        // {path: 'projects', populate: {path: 'portals'}}
        const employee = await Employee.findById(req.params.id)
            // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
            .populate({
                path: "workExperience"
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
            .select("FirstName LastName MiddleName");
            console.log('employee',employee)
        res.status(200).send(employee);

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

const saveWorkExperience = asyncHandler(async (req, res) => {
    try {
        const { error } = WorkexperienceValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            const employee = await Employee.findById(req.params.id);
            if (employee) {
                let newworkexperience;

                newworkexperience = {
                    CompanyName: req.body.CompanyName,
                    Designation: req.body.Designation,
                    FromDate: req.body.FromDate,
                    ToDate: req.body.ToDate
                };

                const workexperience = await WorkExperience.create(newworkexperience)
                if (workexperience) {
                    employee.workexperience.push(workexperience);
                    const empSave = await employee.save();
                    if (empSave) {
                        console.log(empSave);
                        res.status(201).send(workexperience);
                    }
                }
                console.log("new workexperience Saved");
            }
        }
        console.log(req.body);
    } catch (err) {
        res.status(500).send(err);
    }
});

const updateWorkExperience = asyncHandler(async (req, res) => {
    try {
        const { error } = WorkexperienceValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newworkexperience;

            newworkexperience = {
                CompanyName: req.body.CompanyName,
                Designation: req.body.Designation,
                FromDate: req.body.FromDate,
                ToDate: req.body.ToDate
            };

            const workexperience = await WorkExperience.findByIdAndUpdate(
                req.params.id,
                newworkexperience)
            if (workexperience) {
                res.status(201).send(newworkexperience);
            }
        }

        console.log("put");
        console.log(req.body);
    } catch (err) {
        res.status(500).send(err);
    }

});

const deleteWorkExperience = asyncHandler(async (req, res) => {
    try {
        const employee = await Employee.findById({ _id: req.params.id });
        if (employee) {

            const workexperience = await WorkExperience.findByIdAndRemove({ _id: req.params.id2 })
            if (workexperience) {
                console.log("workexperience deleted");
                const numberAffected = await Employee.updateOne(
                    { _id: req.params.id },
                    { $pull: { workexperience: req.params.id2 } })
                if (numberAffected) {
                    console.log(numberAffected);
                    res.status(201).send(workexperience);
                }
            }
        } else {
            console.log(err);
            res.send("error");
        }

        console.log("delete");
        console.log(req.params.id);

    } catch (err) {
        res.status(500).send(err);
    }

});

module.exports = {
    getWorkExperience, saveWorkExperience, updateWorkExperience, deleteWorkExperience
};
