const asyncHandler = require("express-async-handler");
const Employee = require("./../models/employee");
const FamilyInfo = require("./../models/family");
const { FamilyInfoValidation } = require("./../schema/");


const getFamilyInfo = asyncHandler(async (req, res) => {
    try {
        console.log(req.params.id);
        // var employee = {};
        // {path: 'projects', populate: {path: 'portals'}}
        const employee = await Employee.findById(req.params.id)
            // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
            .populate({
                path: "familyInfo"
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
        res.status(500).send(err);
    }
});

const saveFamilyInfo = asyncHandler(async (req, res) => {
    try {
        const { error } = FamilyInfoValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            const employee = await Employee.findById(req.params.id);
            if (employee) {

                let newFamilyInfo;

                newFamilyInfo = {
                    Name: req.body.Name,
                    Relationship: req.body.Relationship,
                    DOB: req.body.DOB,
                    Occupation: req.body.Occupation
                };

                const familyInfo = await FamilyInfo.create(newFamilyInfo)
                if (familyInfo) {
                    employee.familyInfo.push(familyInfo);
                    const employeeInfoDetails = employee.save();
                    if (employeeInfoDetails) {
                        console.log(employeeInfoDetails);
                        res.send(familyInfo);
                    }
                    console.log("new familyInfo Saved");
                }
                console.log(req.body);
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

const updateFamilyInfo = asyncHandler(async (req, res) => {
    try {
        const { error } = FamilyInfoValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newFamilyInfo;

            newFamilyInfo = {
                Name: req.body.Name,
                Relationship: req.body.Relationship,
                DOB: req.body.DOB,
                Occupation: req.body.Occupation
            };

            const familyInfo = await FamilyInfo.findByIdAndUpdate(req.params.id, newFamilyInfo);
            if (familyInfo) {
                res.status(201).send(newFamilyInfo);
            }

        }
        console.log("put");
        console.log(req.body);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});

const deleteFamilyInfo = asyncHandler(async (req, res) => {
    try {
        const employee = await Employee.findById({ _id: req.params.id });

        if (employee) {
            const familyInfo = await FamilyInfo.findByIdAndRemove({ _id: req.params.id2 });
            if (familyInfo) {
                console.log("FamilyInfo deleted");
                const numberAffected = Employee.updateOne(
                    { _id: req.params.id },
                    { $pull: { familyInfo: req.params.id2 } });
                console.log(numberAffected);
                res.send(familyInfo);
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
    getFamilyInfo, saveFamilyInfo, updateFamilyInfo, deleteFamilyInfo
};
