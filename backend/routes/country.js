const express = require("express");
const router = express.Router();
const { verifyHR } = require("./../middleware/authMiddleware")
const { getCountry, saveCountry, updateCountry, deleteCountry } = require("./../controllers/countryController");

// Routes for portal
router.route("/").get(verifyHR, getCountry);
router.route("/").post(verifyHR, saveCountry);
router.route("/:id").put(verifyHR, updateCountry);
router.route("/:id").delete(verifyHR, deleteCountry);


// app.get("/api/country", verifyHR, (req, res) => {
//     Country.find()
//         .populate({ path: "states", populate: { path: "cities" } })
//         .exec(function (err, country) {
//             res.send(country);
//         });
// });

// app.post("/api/country", verifyHR, (req, res) => {
//     Joi.validate(req.body, CountryValidation, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(400).send(err.details[0].message);
//         } else {
//             let newCountry;

//             newCountry = {
//                 CountryName: req.body.CountryName
//             };

//             Country.create(newCountry, function (err, country) {
//                 if (err) {
//                     console.log(err);
//                     res.send("error");
//                 } else {
//                     res.send(country);
//                     console.log("new country Saved");
//                 }
//             });
//             console.log(req.body);
//         }
//     });
// });

// app.put("/api/country/:id", verifyHR, (req, res) => {
//     Joi.validate(req.body, CountryValidation, (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(400).send(err.details[0].message);
//         } else {
//             let newCountry;

//             newCountry = {
//                 CountryName: req.body.CountryName
//             };
//             Country.findByIdAndUpdate(req.params.id, newCountry, function (
//                 err,
//                 country
//             ) {
//                 if (err) {
//                     res.send("error");
//                 } else {
//                     res.send(newCountry);
//                 }
//             });
//         }

//         console.log("put");
//         console.log(req.body);
//     });
// });

// app.delete("/api/country/:id", verifyHR, (req, res) => {
//     Country.findById(req.params.id, function (err, foundCountry) {
//         if (err) {
//             res.send(err);
//         } else {
//             console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", foundCountry);
//             if (!foundCountry.states.length == 0) {
//                 res
//                     .status(403)
//                     .send(
//                         "First Delete All The states in this country before deleting this country"
//                     );
//             } else {
//                 Country.findByIdAndRemove({ _id: req.params.id }, function (
//                     err,
//                     country
//                 ) {
//                     if (!err) {
//                         State.deleteMany({ country: { _id: req.params.id } }, function (
//                             err
//                         ) {
//                             if (err) {
//                                 console.log(err);
//                                 res.send("error");
//                             } else {
//                                 City.deleteMany(
//                                     { state: { country: { _id: req.params.id } } },
//                                     function (err) {
//                                         if (err) {
//                                             console.log(err);
//                                             res.send("error");
//                                         } else {
//                                             console.log(" Country deleted");
//                                             res.send(country);
//                                         }
//                                     }
//                                 );
//                             }
//                         });
//                     } else {
//                         console.log(err);
//                         res.send("error");
//                     }
//                 });
//             }
//         }
//     });

//     console.log("delete");
//     console.log(req.params.id);
// });


module.exports = router;
