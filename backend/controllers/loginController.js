const asyncHandler = require("express-async-handler");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWTKEY || 'xyz';

const Employee = require("./../models/employee");


const login = asyncHandler(async (req, res) => {
    Joi.validate(
        req.body,
        Joi.object().keys({
            email: Joi.string()
                .max(200)
                .required().label("Email can not leave empty"),
            password: Joi.string()
                .max(100)
                .required().label("Password can not leave empty")
        }),
        (err, result) => {
            if (err) {
                console.log(err, 'result', result);
                res.status(400).send(err.details[0].message);
            } else {
                Employee.findOne(
                    { email: req.body.email },
                    "password _id account firstname lastname",
                    function (err, document) {
                        // console.log('case1', err, 'document', document)
                        if (err || document == null) {
                            res.send("false");
                        } else {
                            //console.log('case2', '..........', document, '..', req.body.password);

                            if (document.password === req.body.password) {
                                emp = {
                                    _id: document._id,
                                    account: document.account,
                                    FirstName: document.FirstName,
                                    lastname: document.lastname
                                };
                                var token = jwt.sign(emp, jwtKey);
                                res.send({ "token": token, "emp": emp });
                            } else {
                                //console.log('case3', '..........', result);
                                res.status(400).json({});
                            }
                        }
                    }
                );
            }
        }
    );
});


module.exports = {
    login
};
