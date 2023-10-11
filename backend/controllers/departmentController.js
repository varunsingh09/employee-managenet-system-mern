const asyncHandler = require("express-async-handler");
const Department = require("./../models/department");
const { DepartmentValidation } = require("./../schema/");

const getDepartment = asyncHandler(async (req, res) => {
  try {
    const employees = await Department.find()
      .populate("company")
    res.status(200).send(employees);

  } catch (err) {
    res.status(500).send(err);
  }
});

const saveDepartment = asyncHandler(async (req, res) => {
  try {
    const { error } = DepartmentValidation.validate(req.body);
    if (error) {
      console.log(error);
      res.status(400).send(error.details[0].message);
    } else {
      let newDepartment;

      newDepartment = {
        DepartmentName: req.body.DepartmentName,
        company: req.body.CompanyID
      };

      const department = await Department.create(newDepartment);
      res.status(201).send(department);
      console.log("new Role Saved");
    }
    console.log(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

const updateDepartment = asyncHandler(async (req, res) => {
  try {
    const { error } = DepartmentValidation.validate(req.body);
    if (error) {
      console.log(error);
      res.status(400).send(error.details[0].message);
    } else {
      let updateDepartment;

      updateDepartment = {
        DepartmentName: req.body.DepartmentName,
        company: req.body.CompanyID
      };

      await Department.findByIdAndUpdate(req.params.id, updateDepartment);

      res.status(201).send(updateDepartment);

      console.log("put");
      console.log(req.body);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

const deleteDepartment = asyncHandler(async (req, res) => {
  try {
    const employee = await Employee.find({ department: req.params.id });

    if (employee.length == 0) {
      const department = await Department.findByIdAndRemove({ _id: req.params.id })
      if (department) {
        console.log("department deleted");
        res.status(201).send(department);
        console.log("new Department Saved");
      } else {
        res
          .status(403)
          .send(
            "This department is associated with Employee so you can not delete this"
          );
      }
    }
  } catch (err) {
    res.status(err).send(err);
  }
});

module.exports = {
  getDepartment, saveDepartment, updateDepartment, deleteDepartment
};
