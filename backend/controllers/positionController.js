const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const Position = require("./../models/position");
const { PositionValidation} = require("./../schema/");
  

const getPosition = asyncHandler(async (req, res) => {
    Position.find()
    .populate("company")
    .exec(function (err, role) {
      res.send(role);
    });
});

const savePosition = asyncHandler(async (req, res) => {
    Joi.validate(req.body, PositionValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newPosition;
    
          newPosition = {
            PositionName: req.body.PositionName,
            company: req.body.CompanyID
          };
    
          Position.create(newPosition, function (err, position) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              res.send(position);
              console.log("new Role Saved");
            }
          });
        }
        console.log(req.body);
      });
});

const updatePosition = asyncHandler(async (req, res) => {
    Joi.validate(req.body, PositionValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let updatePosition;
    
          updatePosition = {
            PositionName: req.body.PositionName,
            company: req.body.CompanyID
          };
    
          Position.findByIdAndUpdate(req.params.id, updatePosition, function (
            err,
            position
          ) {
            if (err) {
              res.send("error");
            } else {
              res.send(updatePosition);
            }
          });
        }
    
        console.log("put");
        console.log(req.body);
      });
});

const deletePosition = asyncHandler(async (req, res) => {
    Employee.find({ position: req.params.id }, function (err, p) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          if (p.length == 0) {
            Position.findByIdAndRemove({ _id: req.params.id }, function (
              err,
              position
            ) {
              if (!err) {
                console.log("position deleted");
                res.send(position);
                // });
                console.log("new Position Saved");
              } else {
                console.log("error");
                res.send("err");
              }
            });
            console.log("delete");
            console.log(req.params.id);
          } else {
            res
              .status(403)
              .send(
                "This Position is associated with Employee so you can not delete this"
              );
          }
        }
      });
});

module.exports = {
    getPosition, savePosition, updatePosition, deletePosition
};
