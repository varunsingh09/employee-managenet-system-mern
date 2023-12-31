const express = require("express");
const router = express.Router();
const { verifyHR } = require("./../middleware/authMiddleware")
const { getSalary, saveSalary, updateSalary, deleteSalary} = require("./../controllers/salaryController");

// Routes for salary
router.route("/").get(verifyHR, getSalary);
router.route("/:id").post(verifyHR, saveSalary);
router.route("/:id").put(verifyHR, updateSalary);
router.route("/:id").delete(verifyHR, deleteSalary);

// app.get("/api/salary", verifyHR, (req, res) => {
//     // var employee = {};
//     // {path: 'projects', populate: {path: 'portals'}}
//     Employee.find()
//       // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//       .populate({
//         path: "salary"
//         // populate: {
//         //   path: "state",
//         //   model: "State",
//         //   populate: {
//         //     path: "country",
//         //     model: "Country"
//         //   }
//         // }
//       })
//       // .select(" -role -position -department")
//       .select("FirstName lastname middlename")
//       .exec(function (err, company) {
//         // employee = employees;
//         let filteredCompany = company.filter(data => data["salary"].length == 1);
//         // console.log(filteredCompany);
//         res.send(filteredCompany);
//       });
//   });
  
//   app.post("/api/salary/:id", verifyHR, (req, res) => {
//     Joi.validate(req.body, SalaryValidation, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(400).send(err.details[0].message);
//       } else {
//         Employee.findById(req.params.id, function (err, employee) {
//           if (err) {
//             console.log(err);
//             res.send("err");
//           } else {
//             if (employee.salary.length == 0) {
//               let newSalary;
  
//               newSalary = {
//                 BasicSalary: req.body.BasicSalary,
//                 BankName: req.body.BankName,
//                 accountNo: req.body.accountNo,
//                 accountHolderName: req.body.accountHolderName,
//                 IFSCcode: req.body.IFSCcode,
//                 TaxDeduction: req.body.TaxDeduction
//               };
  
//               Salary.create(newSalary, function (err, salary) {
//                 if (err) {
//                   console.log(err);
//                   res.send("error");
//                 } else {
//                   employee.salary.push(salary);
//                   employee.save(function (err, data) {
//                     if (err) {
//                       console.log(err);
//                       res.send("err");
//                     } else {
//                       console.log(data);
//                       res.send(salary);
//                     }
//                   });
//                   console.log("new salary Saved");
//                 }
//               });
//               console.log(req.body);
//             } else {
//               res
//                 .status(403)
//                 .send("Salary Information about this employee already exits");
//             }
//           }
//         });
//       }
//     });
//   });
  
//   app.put("/api/salary/:id", verifyHR, (req, res) => {
//     Joi.validate(req.body, SalaryValidation, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(400).send(err.details[0].message);
//       } else {
//         let newSalary;
  
//         newSalary = {
//           BasicSalary: req.body.BasicSalary,
//           BankName: req.body.BankName,
//           accountNo: req.body.accountNo,
//           accountHolderName: req.body.accountHolderName,
//           IFSCcode: req.body.IFSCcode,
//           TaxDeduction: req.body.TaxDeduction
//         };
  
//         Salary.findByIdAndUpdate(req.params.id, newSalary, function (err, salary) {
//           if (err) {
//             res.send("error");
//           } else {
//             res.send(newSalary);
//           }
//         });
//       }
  
//       console.log("put");
//       console.log(req.body);
//     });
//   });
  
//   app.delete("/api/salary/:id", verifyHR, (req, res) => {
//     Employee.findById({ _id: req.params.id }, function (err, employee) {
//       console.log("uuuuuuuunnnnnnnnnnnnnnndef", employee.salary[0]);
//       if (err) {
//         res.send("error");
//         console.log(err);
//       } else {
//         Salary.findByIdAndRemove({ _id: employee.salary[0] }, function (
//           err,
//           salary
//         ) {
//           if (!err) {
//             console.log("salary deleted");
//             Employee.update(
//               { _id: req.params.id },
//               { $pull: { salary: employee.salary[0] } },
//               function (err, numberAffected) {
//                 console.log(numberAffected);
//                 res.send(salary);
//               }
//             );
//           } else {
//             console.log(err);
//             res.send("error");
//           }
//         });
//         console.log("delete");
//         console.log(req.params.id);
//       }
//     });
//   });
  

module.exports = router;
