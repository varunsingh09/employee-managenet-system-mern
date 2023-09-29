const express = require("express");
const router = express.Router();
const { verifyHREmployee } = require("./../middleware/authMiddleware")
const { getPersonalInfo, updatePersonalInfo } = require("./../controllers/personalInfoController");

// Routes for personal info
router.route("/:id").get(verifyHREmployee, getPersonalInfo);
router.route("/:id").put(verifyHREmployee, updatePersonalInfo);



// app.get("/api/personal-info/:id", verifyHREmployee, (req, res) => {
//     console.log("personal-info", req.params.id);
//     Employee.findById(req.params.id)
//       // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//       .populate({
//         path: "role position department"
//         //   // populate: {
//         //   //   path: "state",
//         //   //   model: "State",
//         //   //   populate: {
//         //   //     path: "country",
//         //   //     model: "Country"
//         //   //   }
//         //   // }
//       })
//       .select("-salary -education -familyInfo -workexperience")
//       .exec(function (err, employee) {
//         // employee = employees;
//         res.send(employee);
//       });
//   });
  
//   app.put("/api/personal-info/:id", verifyEmployee, (req, res) => {
//     Joi.validate(req.body, EmployeePersonalInfoValidation, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(400).send(err.details[0].message);
//       } else {
//         let newEmployee;
  
//         newEmployee = {
//           bloodgroup: req.body.bloodgroup,
//           contactno: req.body.contactno,
//           dob: req.body.dob,
//           email: req.body.email,
//           emergencycontactno: req.body.emergencycontactno,
//           gender: req.body.gender,
//           hobbies: req.body.hobbies,
//           pancardno: req.body.pancardno,
//           permanetaddress: req.body.permanetaddress,
//           presentaddress: req.body.presentaddress
//         };
//         Employee.findByIdAndUpdate(
//           req.params.id,
//           {
//             $set: newEmployee
//           },
//           function (err, numberAffected) {
//             console.log(numberAffected);
//             res.send(newEmployee);
//           }
//         );
//       }
  
//       console.log("put");
//       console.log(req.body);
//     });
//   });

module.exports = router;
