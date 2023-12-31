const express = require("express");
const router = express.Router();
const { verifyHR } = require("./../middleware/authMiddleware")
const { getEmployee, saveEmployee, updateEmployee, deleteEmployee } = require("./../controllers/employeeController");

// Routes for employee
router.route("/").get(verifyHR, getEmployee);
router.route("/").post(verifyHR, saveEmployee);
router.route("/:id").put(verifyHR, updateEmployee);
router.route("/:id").delete(verifyHR, deleteEmployee);




// app.get("/api/employee", verifyHR, (req, res) => {
//   // {path: 'projects', populate: {path: 'portals'}}
//   Employee.find()
//     // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//     .populate({
//       path: "role position department"
//       // populate: {
//       //   path: "state",
//       //   model: "State",
//       //   populate: {
//       //     path: "country",
//       //     model: "Country"
//       //   }
//       // }
//     })
//     .select("-salary -education -familyInfo -workexperience -password")
//     .exec(function (err, employee) {
//       res.send(employee);
//     });
// });

// app.post("/api/employee", verifyHR, (req, res) => {
//   Joi.validate(req.body, EmployeeValidation, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.status(400).send(err.details[0].message);
//     } else {
//       let newEmployee;

//       newEmployee = {
//         email: req.body.email,
//         password: req.body.password,
//         role: req.body.RoleID,
//         account: req.body.account,
//         gender: req.body.gender,
//         FirstName: req.body.FirstName,
//         middlename: req.body.middlename,
//         lastname: req.body.lastname,
//         dob: req.body.dob,
//         contactno: req.body.contactno,
//         employeecode: req.body.employeecode,
//         department: req.body.DepartmentID,
//         position: req.body.PositionID,
//         dateofjoining: req.body.dateofjoining,
//         terminatedate: req.body.terminatedate
//       };

//       Employee.create(newEmployee, function (err, employee) {
//         if (err) {
//           console.log(err);
//           res.send("error");
//         } else {
//           res.send(employee);

//           console.log("new employee Saved");
//         }
//       });
//       console.log(req.body);
//     }
//   });
// });

// app.put("/api/employee/:id", verifyHR, (req, res) => {
//   Joi.validate(req.body, EmployeeValidationUpdate, (err, result) => {
//     if (err) {
//       console.log(err);
//       res.status(400).send(err.details[0].message);
//     } else {
//       let newEmployee;
//       newEmployee = {
//         email: req.body.email,
//         // password: req.body.password,
//         account: req.body.account,
//         role: req.body.RoleID,
//         gender: req.body.gender,
//         FirstName: req.body.FirstName,
//         middlename: req.body.middlename,
//         lastname: req.body.lastname,
//         dob: req.body.dob,
//         contactno: req.body.contactno,
//         employeecode: req.body.employeecode,
//         department: req.body.DepartmentID,
//         position: req.body.PositionID,
//         dateofjoining: req.body.dateofjoining,
//         terminatedate: req.body.terminatedate
//       };

//       Employee.findByIdAndUpdate(req.params.id, newEmployee, function (
//         err,
//         employee
//       ) {
//         if (err) {
//           res.send("error");
//         } else {
//           res.send(newEmployee);
//         }
//       });
//     }

//     console.log("put");
//     console.log(req.body);
//   });
// });

// app.delete("/api/employee/:id", verifyHR, (req, res) => {
//   // Employee.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
//   //   if (!err) {
//   //     console.log(" state deleted");
//   //     res.send(employee);
//   //   } else {
//   //     console.log(err);
//   //     res.send("error");
//   //   }
//   // });
//   res.send("error");
//   console.log("delete");
//   console.log(req.params.id);
// });


module.exports = router;
