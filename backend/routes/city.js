const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("./../middleware/authMiddleware")
const { getCity, saveCity, updateCity, deleteCity } = require("./../controllers/cityController");

// Routes for portal
router.route("/portal").get(verifyAdmin, getCity);
router.route("/portal").post(verifyAdmin, saveCity);
router.route("/portal/:id").put(verifyAdmin, updateCity);
router.route("/portal/:id").delete(verifyAdmin, deleteCity);


// app.get("/api/city", verifyHR, (req, res) => {
//     City.find()
//       .populate({ path: "state", populate: { path: "country" } })
//       .exec(function (err, city) {
//         // employee = employees;
//         res.send(city);
//       });
//   });
//   app.post("/api/city", verifyHR, (req, res) => {
//     Joi.validate(req.body, CityValidation, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(400).send(err.details[0].message);
//       } else {
//         let newCity;

//         newCity = {
//           CityName: req.body.CityName,
//           state: req.body.StateID
//         };

//         City.create(newCity, function (err, city) {
//           if (err) {
//             console.log(err);
//             res.send("error");
//           } else {
//             State.findById(req.body.StateID, function (err, state) {
//               if (err) {
//                 console.log(err);
//                 res.send("err");
//               } else {
//                 state.cities.push(city);
//                 state.save(function (err, data) {
//                   if (err) {
//                     console.log(err);
//                     res.send("err");
//                   } else {
//                     console.log(data);
//                     res.send(city);
//                   }
//                 });
//               }
//             });

//             console.log("new city Saved");
//           }
//         });
//         console.log(req.body);
//       }
//     });
//   });
//   app.put("/api/city/:id", verifyHR, (req, res) => {
//     Joi.validate(req.body, CityValidation, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(400).send(err.details[0].message);
//       } else {
//         let newCity;

//         newCity = {
//           CityName: req.body.CityName,
//           state: req.body.StateID
//         };

//         City.findByIdAndUpdate(req.params.id, newCity, function (err, city) {
//           if (err) {
//             res.send("error");
//           } else {
//             res.send(newCity);
//           }
//         });
//       }

//       console.log("put");
//       console.log(req.body);
//     });
//   });

//   app.delete("/api/city/:id", verifyHR, (req, res) => {
//     Company.find({ city: req.params.id }, function (err, country) {
//       if (err) {
//         console.log(err);
//         res.send(err);
//       } else {
//         console.log(country.length == 0);
//         if (country.length == 0) {
//           City.findByIdAndRemove({ _id: req.params.id }, function (err, city) {
//             if (!err) {
//               console.log(" state deleted");
//               State.update(
//                 { _id: city.state[0] },
//                 { $pull: { cities: city._id } },
//                 function (err, numberAffected) {
//                   console.log(numberAffected);
//                   res.send(city);
//                 }
//               );
//             } else {
//               console.log(err);
//               res.send("error");
//             }
//           });
//         } else {
//           res
//             .status(403)
//             .send(
//               "This city is associated with company so you can not delete this"
//             );
//         }
//       }
//     });

//     console.log("delete");
//     console.log(req.params.id);
//   });
module.exports = router;
