const express = require("express");
const router = express.Router();
const { login } = require("./../controllers/loginController");

// Routes for login
router.route("/").post( login);


// app.post("/api/login", (req, res) => {

//     Joi.validate(
//       req.body,
//       Joi.object().keys({
//         email: Joi.string()
//           .max(200)
//           .required(),
//         password: Joi.string()
//           .max(100)
//           .required()
//       }),
//       (err, result) => {
//         if (err) {
//           console.log(err, 'result', result);
//           res.status(400).send(err.details[0].message);
//         } else {
//           Employee.findOne(
//             { email: req.body.email },
//             "password _id account firstname lastname",
//             function (err, document) {
//               console.log('err', err, 'document', document)
//               if (err || document == null) {
//                 res.send("false");
//               } else {
//                 if (document.password == req.body.password) {
//                   emp = {
//                     _id: document._id,
//                     account: document.account,
//                     FirstName: document.FirstName,
//                     lastname: document.lastname
//                   };
//                   var token = jwt.sign(emp, jwtKey);
//                   res.send({ "token": token, "emp": emp });
//                 } else {
//                   console.log(err, '..........', result);
//                   res.sendStatus(400);
//                 }
//               }
//             }
//           );
//         }
//       }
//     );
//   });
  
  



module.exports = router;
