const asyncHandler = require("express-async-handler");
const Employee = require("./../models/employee");
const Education = require("./../models/education");
const { EducationValidation } = require("./../schema/");


const getEducation = asyncHandler(async (req, res) => {
    try {
        console.log(req.params.id);
        // var employee = {};
        // {path: 'projects', populate: {path: 'portals'}}
        const employee = await Employee.findById(req.params.id)
            //.populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
            .populate({
                path: "education"
                // populate: {
                //   path: "state",
                //   model: "State",
                //   populate: {
                //     path: "country",
                //     model: "Country"
                //   }
                // }
            })
            .select(" -role -position -department")
            .select("FirstName LastName MiddleName")
        res.send(employee);

    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});

const saveEducation = asyncHandler(async (req, res) => {
    try {
        const { error } = EducationValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            const employee = await Employee.findById(req.params.id);
            if (employee) {
                let newEducation;

                newEducation = {
                    SchoolUniversity: req.body.SchoolUniversity,
                    Degree: req.body.Degree,
                    Grade: req.body.Grade,
                    PassingOfYear: req.body.PassingOfYear
                };

                const education = await Education.create(newEducation);
                if (education) {
                    console.log('employee', employee)
                    employee.education.push(education);
                    const employeeInfo = await employee.save();
                    if (employee) {
                        console.log(employee);
                        res.send(education);
                    }
                    console.log("new Education Saved");
                }
            }
            console.log(req.body);
        }
    } catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
});

const updateEducation = asyncHandler(async (req, res) => {
    try {
        const { error } = EducationValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newEducation;

            newEducation = {
                SchoolUniversity: req.body.SchoolUniversity,
                Degree: req.body.Degree,
                Grade: req.body.Grade,
                PassingOfYear: req.body.PassingOfYear
            };

            const education = await Education.findByIdAndUpdate(req.params.id, newEducation);
            if (education) {
                res.status(201).send(newEducation);
            }
        }
        console.log("put");
        console.log(req.body);
    } catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
});

const deleteEducation = asyncHandler(async (req, res) => {
    try {
        const employee = await Employee.findById({ _id: req.params.id });
        if (employee) {

            const education = await Education.findByIdAndRemove({ _id: req.params.id2 });
            if (education) {
                console.log("education deleted");
                const numberAffected = await Employee.updateOne(
                    { _id: req.params.id },
                    { $pull: { education: req.params.id2 } });
                console.log(numberAffected);
                res.status(201).send(education);


            }
        }
        console.log("delete");
        console.log(req.params.id);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});


module.exports = {
    getEducation, saveEducation, updateEducation, deleteEducation
};
