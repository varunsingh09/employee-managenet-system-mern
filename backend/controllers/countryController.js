const asyncHandler = require("express-async-handler");
const Country = require("./../models/country");
const { CountryValidation } = require("./../schema");

const getCountry = asyncHandler(async (req, res) => {
    try {
        const country = await Country.find()
            .populate({ path: "states", populate: { path: "cities" } });
        res.status(200).send(country);
    } catch (err) {
        console.log('err', err)
        res.status(500).send(err);
    }
});

const saveCountry = asyncHandler(async (req, res) => {
    try {
        const { error } = CountryValidation.validate(req.body);

        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newCountry;

            newCountry = {
                CountryName: req.body.CountryName
            };

            const country = Country.create(newCountry);
            res.status(201).send(country);
            console.log("new country Saved");

            console.log(req.body);
        }
    } catch (err) {
        console.log("err....", err);
        res.status(500).send(err)
    }
});

const updateCountry = asyncHandler(async (req, res) => {
    try {
        const { error } = CountryValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newCountry;

            newCountry = {
                CountryName: req.body.CountryName
            };
            Country.findByIdAndUpdate(req.params.id, newCountry);
            res.send(newCountry);

        }

        console.log("put");
        console.log(req.body);
    } catch (err) {
        res.status(500).send(err);

    }
});

const deleteCountry = asyncHandler(async (req, res) => {
    try {
        const foundCountry = await Country.findById(req.params.id);

        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", foundCountry);
        if (!foundCountry.states.length == 0) {
            res
                .status(403)
                .send(
                    "First Delete All The states in this country before deleting this country"
                );
        } else {
            const country = await Country.findByIdAndRemove({ _id: req.params.id });
            if (country) {
                const state = await State.deleteMany({ country: { _id: req.params.id } });
                if (state) {
                    City.deleteMany({ state: { country: { _id: req.params.id } } });
                    console.log(" Country deleted");
                    res.status(201).send(country);
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
    getCountry, saveCountry, updateCountry, deleteCountry
};
