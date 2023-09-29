const express = require("express");
const router = express.Router();
const { verifyHREmployee } = require("./../middleware/authMiddleware")
const { getWorkExperience, saveWorkExperience, updateWorkExperience, deleteWorkExperience } = require("./../controllers/workExperienceController");

// Routes for work experience
router.route("/:id").get(verifyHREmployee, getWorkExperience);
router.route("/:id").post(verifyHREmployee, saveWorkExperience);
router.route("/:id").put(verifyHREmployee, updateWorkExperience);
router.route("/:id/:id2").delete(verifyHREmployee, deleteWorkExperience);



// //////////////////////////workexperience workexperience
// app.get("/api/work-experience/:id", verifyHREmployee, (req, res) => {
//     console.log(req.params.id);
//     // var employee = {};
//     // {path: 'projects', populate: {path: 'portals'}}
//     Employee.findById(req.params.id)
//         // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//         .populate({
//             path: "workexperience"
//             // populate: {
//             //   path: "state",
//             //   model: "State",
//             //   populate: {
//             //     path: "country",
//             //     model: "Country"
//             //   }
//             // }
//         })
//         // .select(" -role -position -department")
//         .select("FirstName lastname middlename")
//         .exec(function (err, employee) {
//             res.send(employee);
//         });
// });

// app.post("/api/work-experience/:id", verifyEmployee, (req, res) => {
//     Joi.validate(req.body, workexperienceValidation, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(400).send(err.details[0].message);
//         } else {
//             Employee.findById(req.params.id, function (err, employee) {
//                 if (err) {
//                     console.log(err);
//                     res.send("err");
//                 } else {
//                     let newworkexperience;

//                     newworkexperience = {
//                         CompanyName: req.body.CompanyName,
//                         Designation: req.body.Designation,
//                         FromDate: req.body.FromDate,
//                         ToDate: req.body.ToDate
//                     };

//                     workexperience.create(newworkexperience, function (
//                         err,
//                         workexperience
//                     ) {
//                         if (err) {
//                             console.log(err);
//                             res.send("error");
//                         } else {
//                             employee.workexperience.push(workexperience);
//                             employee.save(function (err, data) {
//                                 if (err) {
//                                     console.log(err);
//                                     res.send("err");
//                                 } else {
//                                     console.log(data);
//                                     res.send(workexperience);
//                                 }
//                             });
//                             console.log("new workexperience Saved");
//                         }
//                     });
//                     console.log(req.body);
//                 }
//             });
//         }
//     });
// });

// app.put("/api/work-experience/:id", verifyEmployee, (req, res) => {
//     Joi.validate(req.body, workexperienceValidation, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(400).send(err.details[0].message);
//         } else {
//             let newworkexperience;

//             newworkexperience = {
//                 CompanyName: req.body.CompanyName,
//                 Designation: req.body.Designation,
//                 FromDate: req.body.FromDate,
//                 ToDate: req.body.ToDate
//             };

//             workexperience.findByIdAndUpdate(
//                 req.params.id,
//                 newworkexperience,
//                 function (err, workexperience) {
//                     if (err) {
//                         res.send("error");
//                     } else {
//                         res.send(newworkexperience);
//                     }
//                 }
//             );
//         }
//         console.log("put");
//         console.log(req.body);
//     });
// });

// app.delete("/api/Work-experience/:id/:id2", verifyEmployee, (req, res) => {
//     Employee.findById({ _id: req.params.id }, function (err, employee) {
//         if (err) {
//             res.send("error");
//             console.log(err);
//         } else {
//             workexperience.findByIdAndRemove({ _id: req.params.id2 }, function (
//                 err,
//                 workexperience
//             ) {
//                 if (!err) {
//                     console.log("workexperience deleted");
//                     Employee.update(
//                         { _id: req.params.id },
//                         { $pull: { workexperience: req.params.id2 } },
//                         function (err, numberAffected) {
//                             console.log(numberAffected);
//                             res.send(workexperience);
//                         }
//                     );
//                 } else {
//                     console.log(err);
//                     res.send("error");
//                 }
//             });
//             console.log("delete");
//             console.log(req.params.id);
//         }
//     });
// });




module.exports = router;
