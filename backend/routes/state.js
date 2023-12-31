const express = require("express");
const router = express.Router();
const { verifyHR } = require("./../middleware/authMiddleware")
const { getState, saveState, updateState, deleteState } = require("./../controllers/stateController");

// Routes for state
router.route("/").get(verifyHR, getState);
router.route("/").post(verifyHR, saveState);
router.route("/:id").put(verifyHR, updateState);
router.route("/:id").delete(verifyHR, deleteState);




// app.get("/api/state", verifyHR, (req, res) => {
//     State.find()
//       .populate("country citiesx")
//       .exec(function (err, country) {
//         res.send(country);
//       });
//   });
//   //State
//   app.post("/api/state", verifyHR, (req, res) => {
//     Joi.validate(req.body, StateValidation, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(400).send(err.details[0].message);
//       } else {
//         let newState;

//         newState = {
//           StateName: req.body.StateName,
//           country: req.body.CountryID
//         };

//         State.create(newState, function (err, state) {
//           if (err) {
//             console.log(err);
//             res.send("error");
//           } else {
//             Country.findById(req.body.CountryID, function (err, country) {
//               if (err) {
//                 console.log(err);
//                 res.send("err");
//               } else {
//                 country.states.push(state);
//                 country.save(function (err, data) {
//                   if (err) {
//                     console.log(err);
//                     res.send("err");
//                   } else {
//                     console.log(data);
//                     res.send(state);
//                   }
//                 });
//               }
//             });
//             console.log("new country Saved");
//           }
//         });
//         console.log(req.body);
//       }
//     });
//   });
//   //State
//   //state
//   app.put("/api/state/:id", verifyHR, (req, res) => {
//     Joi.validate(req.body, StateValidation, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(400).send(err.details[0].message);
//       } else {
//         let newState;

//         newState = {
//           StateName: req.body.StateName,
//           country: req.body.CountryID
//         };

//         State.findByIdAndUpdate(req.params.id, newState, function (err, state) {
//           if (err) {
//             res.send("error");
//           } else {
//             res.send(newState);
//           }
//         });
//       }

//       console.log("put");
//       console.log(req.body);
//     });
//   });

//   app.delete("/api/state/:id", verifyHR, (req, res) => {
//     State.findById(req.params.id, function (err, foundState) {
//       if (err) {
//         res.send(err);
//       } else {
//         // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", foundCountry);
//         if (!foundState.cities.length == 0) {
//           res
//             .status(403)
//             .send(
//               "First Delete All The cities in this state before deleting this state"
//             );
//         } else {
//           State.findByIdAndRemove({ _id: req.params.id }, function (err, state) {
//             if (!err) {
//               console.log(" state deleted");
//               console.log("country id---------", state.country[0]);
//               Country.update(
//                 { _id: state.country[0] },
//                 { $pull: { states: state._id } },
//                 function (err, numberAffected) {
//                   console.log(numberAffected);
//                   res.send(state);
//                 }
//               );
//             } else {
//               console.log(err);
//               res.send("error");
//             }
//           });
//         }
//       }
//     });

//     console.log("delete");
//     console.log(req.params.id);
//   });

module.exports = router;
