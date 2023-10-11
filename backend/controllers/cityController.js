const asyncHandler = require("express-async-handler");
const Company = require("./../models/company");
const { City } = require("./../models/city");
const State = require("./../models/state");
const { CityValidation } = require("./../schema/");


const getCity = asyncHandler(async (req, res) => {
    try {
        const city = await City.find()
            .populate({ path: "state", populate: { path: "country" } });
        console.log('city', city)
        res.status(200).send(city);

    } catch (err) {
        res.status(500).send(err);
    }
});

const saveCity = asyncHandler(async (req, res) => {
    try {
        const { error } = CityValidation.validate(req.body);

        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newCity;
            newCity = {
                CityName: req.body.CityName,
                state: req.body.StateID
            };
            const city = await City.create(newCity);
            if (city) {
                const state = await State.findById(req.body.StateID);
                state.cities.push(city);
                state.save();
                if (state) {

                    console.log(state);
                    res.status(200).send(city);
                }
            }
        }


        console.log("new city Saved");
        console.log(req.body);

    } catch (err) {
        console.log('err',err);
        res.status(500).send(err);
    }
});

const updateCity = asyncHandler(async (req, res) => {
    try {
        const { error } = CityValidation.validate(req.body);

        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
                let newCity;

                newCity = {
                    CityName: req.body.CityName,
                    state: req.body.StateID
                };

                await City.findByIdAndUpdate(req.params.id, newCity)
                res.status(201).send(newCity);

            }
            console.log("put");
            console.log(req.body);
    } catch (err) {
        res.status(500).send(err);
    }
});

const deleteCity = asyncHandler(async (req, res) => {
    try {
        Company.find({ city: req.params.id }, async function (err, country) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(country.length == 0);
                if (country.length == 0) {
                    const city = await City.findByIdAndRemove({ _id: req.params.id });
                    if (city) {
                        console.log(" state deleted");
                        State.update(
                            { _id: city.state[0] },
                            { $pull: { cities: city._id } },
                            function (err, numberAffected) {
                                console.log(numberAffected);
                                res.send(city);
                            }
                        );
                    }

                } else {
                    res
                        .status(403)
                        .send(
                            "This city is associated with company so you can not delete this"
                        );
                }
            }
        });

        console.log("delete");
        console.log(req.params.id);
    } catch (err) {
        res.status(500).send(err);
    }
});



module.exports = {
    getCity, saveCity, updateCity, deleteCity
};
