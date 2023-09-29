const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const Company = require("./../models/company");
const { CompanyValidation } = require("./../schema/");


const getCompany = asyncHandler(async (req, res) => {
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    Company.find()
        // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
        .populate({
            path: "city",
            populate: {
                path: "state",
                model: "State",
                populate: {
                    path: "country",
                    model: "Country"
                }
            }
        })
        .exec(function (err, compnay) {
            res.send(compnay);
        });
});

const saveCompany = asyncHandler(async (req, res) => {
    Joi.validate(req.body, CompanyValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newCompany;

            newCompany = {
                CompanyName: req.body.CompanyName,
                Address: req.body.Address,
                city: req.body.CityID,
                PostalCode: req.body.PostalCode,
                Website: req.body.Website,
                email: req.body.email,
                ContactPerson: req.body.ContactPerson,
                contactno: req.body.contactno,
                FaxNo: req.body.FaxNo,
                PanNo: req.body.PanNo,
                GSTNo: req.body.GSTNo,
                CINNo: req.body.CINNo
            };

            Company.create(newCompany, function (err, company) {
                if (err) {
                    console.log(err);
                    res.send("error");
                } else {
                    res.send(newCompany);
                    console.log("new company Saved");
                }
            });
            console.log(req.body);
        }
    });
});

const updateCompany = asyncHandler(async (req, res) => {
    Joi.validate(req.body, CompanyValidation, (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
        } else {
            let newCompany;

            newCompany = {
                CompanyName: req.body.CompanyName,
                Address: req.body.Address,
                city: req.body.CityID,
                PostalCode: req.body.PostalCode,
                Website: req.body.Website,
                email: req.body.email,
                ContactPerson: req.body.ContactPerson,
                contactno: req.body.contactno,
                FaxNo: req.body.FaxNo,
                PanNo: req.body.PanNo,
                GSTNo: req.body.GSTNo,
                CINNo: req.body.CINNo
            };

            Company.findByIdAndUpdate(req.params.id, newCompany, function (
                err,
                company
            ) {
                if (err) {
                    res.send("error");
                } else {
                    res.send(newCompany);
                }
            });
        }

        console.log("put");
        console.log(req.body);
    });
});


module.exports = {
    getCompany, saveCompany, updateCompany
};
