const express = require("express");
const router = express.Router();
const { verifyAdminHR } = require("./../middleware/authMiddleware")
const { getCompany, saveCompany, updateCompany } = require("./../controllers/companyController");

// Routes for company
router.route("/").get(verifyAdminHR, getCompany);
router.route("/").post(verifyAdminHR, saveCompany);
router.route("/:id").put(verifyAdminHR, updateCompany);



// app.get("/api/company", verifyAdminHR, (req, res) => {
//     // var employee = {};
//     // {path: 'projects', populate: {path: 'portals'}}
//     Company.find()
//       // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
//       .populate({
//         path: "city",
//         populate: {
//           path: "state",
//           model: "State",
//           populate: {
//             path: "country",
//             model: "Country"
//           }
//         }
//       })
//       .exec(function (err, compnay) {
//         res.send(compnay);
//       });
//   });
//   app.post("/api/company", verifyHR, (req, res) => {
//     Joi.validate(req.body, CompanyValidation, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(400).send(err.details[0].message);
//       } else {
//         let newCompany;
  
//         newCompany = {
//           CompanyName: req.body.CompanyName,
//           Address: req.body.Address,
//           city: req.body.CityID,
//           PostalCode: req.body.PostalCode,
//           Website: req.body.Website,
//           email: req.body.email,
//           ContactPerson: req.body.ContactPerson,
//           contactno: req.body.contactno,
//           FaxNo: req.body.FaxNo,
//           PanNo: req.body.PanNo,
//           GSTNo: req.body.GSTNo,
//           CINNo: req.body.CINNo
//         };
  
//         Company.create(newCompany, function (err, company) {
//           if (err) {
//             console.log(err);
//             res.send("error");
//           } else {
//             res.send(newCompany);
//             console.log("new company Saved");
//           }
//         });
//         console.log(req.body);
//       }
//     });
//   });
//   app.put("/api/company/:id", verifyHR, (req, res) => {
//     Joi.validate(req.body, CompanyValidation, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(400).send(err.details[0].message);
//       } else {
//         let newCompany;
  
//         newCompany = {
//           CompanyName: req.body.CompanyName,
//           Address: req.body.Address,
//           city: req.body.CityID,
//           PostalCode: req.body.PostalCode,
//           Website: req.body.Website,
//           email: req.body.email,
//           ContactPerson: req.body.ContactPerson,
//           contactno: req.body.contactno,
//           FaxNo: req.body.FaxNo,
//           PanNo: req.body.PanNo,
//           GSTNo: req.body.GSTNo,
//           CINNo: req.body.CINNo
//         };
  
//         Company.findByIdAndUpdate(req.params.id, newCompany, function (
//           err,
//           company
//         ) {
//           if (err) {
//             res.send("error");
//           } else {
//             res.send(newCompany);
//           }
//         });
//       }
  
//       console.log("put");
//       console.log(req.body);
//     });
//   });

module.exports = router;
