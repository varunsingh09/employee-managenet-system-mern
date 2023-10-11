const asyncHandler = require("express-async-handler");
const Company = require("./../models/company");
const { CompanyValidation } = require("./../schema/");


const getCompany = asyncHandler(async (req, res) => {
    try {
        // var employee = {};
        // {path: 'projects', populate: {path: 'portals'}}
        const conpany = await Company.find()
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
            });

        res.status(200).send(conpany);

    } catch (err) {
        res.status(500).send(err);
    }

});

const saveCompany = asyncHandler(async (req, res) => {
    try {
        const { error } = CompanyValidation.validate(req.body);

        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newCompany;

            newCompany = {
                CompanyName: req.body.CompanyName,
                Address: req.body.Address,
                city: req.body.CityID,
                PostalCode: req.body.PostalCode,
                Website: req.body.Website,
                Email: req.body.Email,
                ContactPerson: req.body.ContactPerson,
                ContactNo: req.body.ContactNo,
                FaxNo: req.body.FaxNo,
                PanNo: req.body.PanNo,
                GSTNo: req.body.GSTNo,
                CINNo: req.body.CINNo
            };

            await Company.create(newCompany);
            res.status(201).send(newCompany);
            console.log("new company Saved");

            console.log(req.body);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

const updateCompany = asyncHandler(async (req, res) => {
    try {
        const { error } = CompanyValidation.validate(req.body);

        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
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
            await Company.findByIdAndUpdate(req.params.id, newCompany);
            res.send(newCompany);
        }

        console.log("put");
        console.log(req.body);
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = {
    getCompany, saveCompany, updateCompany
};
