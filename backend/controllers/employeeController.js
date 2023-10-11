const asyncHandler = require("express-async-handler");
const Employee = require("./../models/employee");
const { EmployeeValidationUpdate, EmployeeValidation } = require("./../schema/");


const getEmployee = asyncHandler(async (req, res) => {
    try {
        // {path: 'projects', populate: {path: 'portals'}}
        const employee = await  Employee.find()
            // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
            .populate({
                path: "role position department"
                // populate: {
                //   path: "state",
                //   model: "State",
                //   populate: {
                //     path: "country",
                //     model: "Country"
                //   }
                // }
            })
            .select("-salary -education -familyInfo -workexperience -password");
            console.log('employee',employee)
        res.status(200).send(employee);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

const saveEmployee = asyncHandler(async (req, res) => {
    try {
        const { error } = EmployeeValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newEmployee;

            newEmployee = {
                Email: req.body.Email,
                Password: req.body.Password,
                role: req.body.RoleID,
                Account: req.body.Account,
                Gender: req.body.Gender,
                FirstName: req.body.FirstName,
                MiddleName: req.body.MiddleName,
                LastName: req.body.LastName,
                DOB: req.body.DOB,
                ContactNo: req.body.ContactNo,
                EmployeeCode: req.body.EmployeeCode,
                department: req.body.DepartmentID,
                position: req.body.PositionID,
                DateOfJoining: req.body.DateOfJoining,
                TerminateDate: req.body.TerminateDate
            };

            const employee = await Employee.create(newEmployee);
            if (employee) {
                res.status(201).send(employee);
                console.log("new employee Saved");
            }
            console.log(req.body);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

const updateEmployee = asyncHandler(async (req, res) => {
    try {
        const { error } = EmployeeValidationUpdate.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newEmployee;
            newEmployee = {
                Email: req.body.Email,
               // Password: req.body.Password,
                role: req.body.RoleID,
                Account: req.body.Account,
                Gender: req.body.Gender,
                FirstName: req.body.FirstName,
                MiddleName: req.body.MiddleName,
                LastName: req.body.LastName,
                DOB: req.body.DOB,
                ContactNo: req.body.ContactNo,
                EmployeeCode: req.body.EmployeeCode,
                department: req.body.DepartmentID,
                position: req.body.PositionID,
                DateOfJoining: req.body.DateOfJoining,
                TerminateDate: req.body.TerminateDate
            };
            const employee = await Employee.findByIdAndUpdate(req.params.id, newEmployee)
            if (employee) {

                res.status(201).send(newEmployee);
            }
        }

        console.log("put");
        console.log(req.body);
    } catch (err) {
        res.status(500).send(err);
    }
});

const deleteEmployee = asyncHandler(async (req, res) => {
    try {
        const employee = await Employee.findByIdAndRemove({ _id: req.params.id })
        if (employee) {
            console.log(" state deleted");
            res.send(employee);
        }
        res.send("error");
        console.log("delete");
        console.log(req.params.id);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = {
    getEmployee,
    saveEmployee,
    updateEmployee,
    deleteEmployee
};
