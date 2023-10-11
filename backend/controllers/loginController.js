const asyncHandler = require("express-async-handler");
const { LoginValidation } = require("./../schema/");
const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWTKEY || 'xyz';

const Employee = require("./../models/employee");


const login = asyncHandler(async (req, res) => {
    try {

        const { error } = LoginValidation.validate(req.body);
        console.log('validation', typeof error)
        if (!error) {
            const employee = await Employee.findOne(
                { Email: req.body.email },
                "Password _id Account FirstName LastName");
            console.log('case1', 'employee', employee)
            if (employee == null) {
                console.log('case2', 'employee', employee)
                res.send("false");
            } else {
                console.log('case3', '..........', employee.Password, '.....', req.body.password);
                if (employee.Password === req.body.password) {


                    emp = {
                        _id: employee._id,
                        account: employee.Account,
                        firstName: employee.FirstName,
                        lastnName: employee.LastName
                    };
                    var token = jwt.sign(emp, process.env.jwtKey);
                    res.status(200).send({ "token": token, "emp": emp });
                    console.log('emp', emp)
                } else {
                    //console.log('case3', '..........', result);
                    res.status(400).json({});
                }
            }



        } else {
            console.log("error", error);
            res.status(400).send(error.details[0].message);
        }
    } catch (err) {
        console.log('err', '..........', err);
        res.status(500).send(err);
    }
});


module.exports = {
    login
};
