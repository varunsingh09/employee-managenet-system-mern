const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const Employee = require("./../models/employee");
const { EmployeePersonalInfoValidation } = require("./../schema/");

const getPersonalInfo = asyncHandler(async (req, res) => {
    console.log("personal-info", req.params.id);
    Employee.findById(req.params.id)
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "role position department"
            //   // populate: {
            //   //   path: "state",
            //   //   model: "State",
            //   //   populate: {
            //   //     path: "country",
            //   //     model: "Country"
            //   //   }
            //   // }
        })
        .select("-salary -education -familyInfo -workexperience")
        .exec(function (err, employee) {
            // employee = employees;
            res.send(employee);
        });
});

const updatePersonalInfo = asyncHandler(async (req, res) => {
    Joi.validate(req.body, EmployeePersonalInfoValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newEmployee;

            newEmployee = {
                bloodgroup: req.body.bloodgroup,
                contactno: req.body.contactno,
                dob: req.body.dob,
                email: req.body.email,
                emergencycontactno: req.body.emergencycontactno,
                gender: req.body.gender,
                hobbies: req.body.hobbies,
                pancardno: req.body.pancardno,
                permanetaddress: req.body.permanetaddress,
                presentaddress: req.body.presentaddress
            };
            Employee.findByIdAndUpdate(
                req.params.id,
                {
                    $set: newEmployee
                },
                function (err, numberAffected) {
                    console.log(numberAffected);
                    res.send(newEmployee);
                }
            );
        }

        console.log("put");
        console.log(req.body);
    });
});


module.exports = {
    getPersonalInfo, updatePersonalInfo
};
