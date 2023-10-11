const asyncHandler = require("express-async-handler");
const Role = require("./../models/role");
const { RoleValidation } = require("./../schema/");


const getRole = asyncHandler(async (req, res) => {
    try {
        const role = await Role.find()
            .populate("company");
        console.log('role', role)
        res.status(200).send(role);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.details[0].message);
    }
});

const saveRole = asyncHandler(async (req, res) => {
    try {

        const { error } = RoleValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newRole;

            newRole = {
                RoleName: req.body.RoleName,
                company: req.body.CompanyID
            };

            const role = Role.create(newRole);
            res.status(201).send(role);
            console.log("new Role Saved");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err.details[0].message);
    }

});

const updateRole = asyncHandler(async (req, res) => {
    try {
        const { error } = RoleValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let updateRole;

            updateRole = {
                RoleName: req.body.RoleName,
                company: req.body.CompanyID
            };

            const role = await Role.findByIdAndUpdate(req.params.id, updateRole);
            res.status(201).send(updateRole);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

const deleteRole = asyncHandler(async (req, res) => {
    try {

        const employee = await Employee.findOne({ role: req.params.id });
        if (employee.length == 0) {
            const role = await Role.findByIdAndRemove({ _id: req.params.id });
            if (!role) {
                console.log(" Role deleted");
                res.status(200).send(role);
            }
            console.log("delete");
        } else {
            res.status(403)
                .send(
                    "This role is associated with Employee so you can not delete this"
                );
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = {
    getRole,
    saveRole,
    updateRole,
    deleteRole
};
