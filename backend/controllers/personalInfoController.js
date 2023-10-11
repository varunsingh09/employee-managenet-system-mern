const asyncHandler = require("express-async-handler");
const Employee = require("./../models/employee");
const { EmployeePersonalInfoValidation } = require("./../schema/");

const getPersonalInfo = asyncHandler(async (req, res) => {
    try {
        console.log("personal-info", req.params.id);
        const employee = await Employee.findById(req.params.id)
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
            .select("-salary -education -familyInfo -workexperience");
        res.status(200).send(employee);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

const updatePersonalInfo = asyncHandler(async (req, res) => {
    try {
        const { error } = EmployeePersonalInfoValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newEmployee;

            newEmployee = {
                BloodGroup: req.body.BloodGroup,
                ContactNo: req.body.ContactNo,
                DOB: req.body.DOB,
                Email: req.body.Email,
                EmergencyContactNo: req.body.EmergencyContactNo,
                Gender: req.body.Gender,
                Hobbies: req.body.Hobbies,
                PANcardNo: req.body.PANcardNo,
                PermanetAddress: req.body.PermanetAddress,
                PresentAddress: req.body.PresentAddress
            };
            const numberAffected = await Employee.findByIdAndUpdate(
                req.params.id,
                {
                    $set: newEmployee
                })
            if (numberAffected) {
                console.log(numberAffected);
                res.send(newEmployee);
            }

        }

        console.log("put");
        console.log(req.body);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


module.exports = {
    getPersonalInfo, updatePersonalInfo
};
