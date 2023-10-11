const express = require("express");
const router = express.Router();
const { verifyHR } = require("./../middleware/authMiddleware")
const { getLeaveApplication,
    updateLeaveApplication, deleteLeaveApplication } = require("./../controllers/leaveApplicationHrController");

// Routes for work experience
router.route("/").get(verifyHR, getLeaveApplication);
router.route("/:id").put(verifyHR, updateLeaveApplication);
router.route("/:id/:id2").delete(verifyHR, deleteLeaveApplication);


// ////////////leaveapplication leaveapplication HHHHHHRRRRR
// app.get("/api/leave-application-hr", verifyHR, (req, res) => {
//     // var employee = {};
//     // {path: 'projects', populate: {path: 'portals'}}
//     leaveapplication.find()
//         // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//         .populate({
//             path: "employee"
//         })
//         // .select(" -role -position -department")
//         // .select("FirstName lastname middlename"
//         // )
//         .exec(function (err, leaveapplication) {
//             // console.log(filteredCompany);
//             if (err) {
//                 console.log(err);
//                 res.send("error");
//             } else {
//                 res.send(leaveapplication);
//             }
//         });
// });

// app.put("/api/leave-application-hr/:id", verifyHR, (req, res) => {
//     Joi.validate(req.body, leaveapplicationHRValidation, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(400).send(err.details[0].message);
//         } else {
//             let newleaveapplication;

//             newleaveapplication = {
//                 Status: req.body.Status
//             };
//             leaveapplication.findByIdAndUpdate(
//                 req.params.id,
//                 {
//                     $set: newleaveapplication
//                 },
//                 function (err, numberAffected) {
//                     console.log(numberAffected);
//                     res.send(newleaveapplication);
//                 }
//             );

//             console.log(req.body);
//         }
//     });
// });

// app.delete("/api/leave-application-hr/:id/:id2", verifyHR, (req, res) => {
//     Employee.findById({ _id: req.params.id }, function (err, employee) {
//         if (err) {
//             res.send("error");
//             console.log(err);
//         } else {
//             leaveapplication.findByIdAndRemove({ _id: req.params.id2 }, function (
//                 err,
//                 leaveapplication
//             ) {
//                 if (!err) {
//                     console.log("leaveapplication deleted");
//                     Employee.update(
//                         { _id: req.params.id },
//                         { $pull: { leaveapplication: req.params.id2 } },
//                         function (err, numberAffected) {
//                             console.log(numberAffected);
//                             res.send(leaveapplication);
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
