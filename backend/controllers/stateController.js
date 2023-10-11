const asyncHandler = require("express-async-handler");
const State = require("./../models/state");
const Country = require("./../models/country");
const { City } = require("./../models/city");

const { StateValidation } = require("./../schema/");


const getState = asyncHandler(async (req, res) => {
    try {
        const country = await State.find()
            .populate("country cities")

        res.status(200).send(country);

    } catch (err) {
        console.log("err", err);
        res.status(500).send(err);
    }
});

const saveState = asyncHandler(async (req, res) => {
    try {

        const { error } = StateValidation.validate(req.body);

        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newState;

            newState = {
                StateName: req.body.StateName,
                country: req.body.CountryID
            };

            const state = await State.create(newState)
            if (state) {
                const country = await Country.findById(req.body.CountryID);
                //console.log('country', country)
                if (country) {
                    country.states.push(state);
                    const cntSave = await country.save();
                    if (cntSave) {
                        console.log(cntSave);
                        res.status(201).send(state);
                    }
                }
            }
            console.log("new country Saved");
        }
        console.log(req.body);

    } catch (err) {
        console.log('err............', err);
        res.status(500).send(err);
    }
});

const updateState = asyncHandler(async (req, res) => {
    try {
        const { error } = StateValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newState;

            newState = {
                StateName: req.body.StateName,
                country: req.body.CountryID
            };

            const state = await State.findByIdAndUpdate(req.params.id, newState);
            if (state) {
                res.status(201).send(newState);
            }

        }

        console.log("put");
        console.log(req.body);
    } catch (err) {
        res.status(500).send(err);
    }
});

const deleteState = asyncHandler(async (req, res) => {
    try {
        const foundState = await State.findById(req.params.id)
        if (foundState) {
            // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", foundCountry);
            if (!foundState.cities.length == 0) {
                res
                    .status(403)
                    .send(
                        "First Delete All The cities in this state before deleting this state"
                    );
            } else {
                const state = await State.findByIdAndRemove({ _id: req.params.id });
                if (state) {
                    console.log(" state deleted");
                    console.log("country id---------", state.country[0]);
                    const numberAffected = await Country.updateOne(
                        { _id: state.country[0] },
                        { $pull: { states: state._id } });
                    if (numberAffected) {
                        console.log(numberAffected);
                        res.send(state);
                    }
                }
            }
        }
        console.log("delete");
        console.log(req.params.id);
    } catch (err) {
        res.status(500).send(err);
    }
});



module.exports = {
    getState, saveState, updateState, deleteState
};
