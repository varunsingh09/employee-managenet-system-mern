const asyncHandler = require("express-async-handler");
const Position = require("./../models/position");
const { PositionValidation } = require("./../schema/");


const getPosition = asyncHandler(async (req, res) => {
  try {
    const role = await Position.find()
      .populate("company");
    res.status(200).send(role);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

const savePosition = asyncHandler(async (req, res) => {
  try {

    const { error } = PositionValidation.validate(req.body);
    if (error) {
      console.log(error);
      res.status(400).send(error.details[0].message);
    } else {
      let newPosition;

      newPosition = {
        PositionName: req.body.PositionName,
        company: req.body.CompanyID
      };

      const position = await Position.create(newPosition);
      if (position) {
        res.status(201).send(position);
        console.log("new Role Saved");
      }
    }
    console.log(req.body);
  } catch (err) {
    res.status(500).send(err);
  }
});

const updatePosition = asyncHandler(async (req, res) => {
  try {
    const { error } = PositionValidation.validate(req.body);
    if (error) {
      console.log(error);
      res.status(400).send(error.details[0].message);
    } else {
      let updatePosition;

      updatePosition = {
        PositionName: req.body.PositionName,
        company: req.body.CompanyID
      };

      const position = await Position.findByIdAndUpdate(req.params.id, updatePosition);
      if (position) {
        res.status(201).send(updatePosition);
      }
    }
    console.log("put");
    console.log(req.body);
  } catch (err) {
    res.status(500).send(err);
  }
});

const deletePosition = asyncHandler(async (req, res) => {
  try {
    const employee = await Employee.find({ position: req.params.id });
    if (employee) {
      if (employee.length == 0) {
        const position = await Position.findByIdAndRemove({ _id: req.params.id });
        if (position) {
          console.log("position deleted");
          res.status(201).send(position);
          // });
          console.log("new Position Saved");
        }
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
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = {
  getPosition, savePosition, updatePosition, deletePosition
};
