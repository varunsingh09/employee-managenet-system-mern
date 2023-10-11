const asyncHandler = require("express-async-handler");
const Employee = require("./../models/employee");
const Salary = require("./../models/salary");
const { SalaryValidation } = require("./../schema/");


const getSalary = asyncHandler(async (req, res) => {
    try {
        // var employee = {};
        // {path: 'projects', populate: {path: 'portals'}}
        const company = await Employee.find()
            // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
            .populate({
                path: "salary"
                // populate: {
                //   path: "state",
                //   model: "State",
                //   populate: {
                //     path: "country",
                //     model: "Country"
                //   }
                // }
            })
            // .select(" -role -position -department")
            .select("FirstName LastName MiddleName")
        // employee = employees;
        let filteredCompany = company.filter(data => data["salary"].length == 1);
        // console.log(filteredCompany);
        res.status(200).send(filteredCompany);
    } catch (err) {
        res.status(500).send(err);
    }
});

const saveSalary = asyncHandler(async (req, res) => {
    try {
        const { error } = SalaryValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            const employee = await Employee.findById(req.params.id);
            if (employee) {
                if (employee.salary.length == 0) {
                    let newSalary;

                    newSalary = {
                        BasicSalary: req.body.BasicSalary,
                        BankName: req.body.BankName,
                        AccountNo: req.body.AccountNo,
                        AccountHolderName: req.body.AccountHolderName,
                        IFSCcode: req.body.IFSCcode,
                        TaxDeduction: req.body.TaxDeduction
                    };

                    const salary =await Salary.create(newSalary);
                    if (salary) {
                        employee.salary.push(salary);
                        const empsave = await employee.save();
                        if (empsave) {
                            console.log(empsave);
                            res.send(salary);
                        }
                    }
                    console.log("new salary Saved");
                }

                console.log(req.body);
            } else {
                res
                    .status(403)
                    .send("Salary Information about this employee already exits");
            }
        }
    } catch (err) {
        console.log('err',err);
        res.status(500).send(err);
    }
});

const updateSalary = asyncHandler(async (req, res) => {
    try {
        const { error } = SalaryValidation.validate(req.body);
        if (error) {
            console.log(error);
            res.status(400).send(error.details[0].message);
        } else {
            let newSalary;

            newSalary = {
                BasicSalary: req.body.BasicSalary,
                BankName: req.body.BankName,
                AccountNo: req.body.AccountNo,
                AccountHolderName: req.body.AccountHolderName,
                IFSCcode: req.body.IFSCcode,
                TaxDeduction: req.body.TaxDeduction
            };

            const salary = await Salary.findByIdAndUpdate(req.params.id, newSalary);
            if (salary) {
                res.status(201).send(newSalary);
            }
        }

        console.log("put");
        console.log(req.body);
    } catch (err) {
        console.log('err',err);
        res.status(500).send(err);
    }
});

const deleteSalary = asyncHandler(async (req, res) => {
    try {
        const employee = await Employee.findById({ _id: req.params.id })
        console.log("uuuuuuuunnnnnnnnnnnnnnndef", employee.salary[0]);
        if (employee) {
            const salary = await Salary.findByIdAndRemove({ _id: employee.salary[0] });
            if (salary) {
                console.log("salary deleted");
                const numberAffected = await Employee.updateOne(
                    { _id: req.params.id },
                    { $pull: { salary: employee.salary[0] } });
                if (numberAffected) {
                    console.log(numberAffected);
                    res.status(201).send(salary);
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
    getSalary, saveSalary, updateSalary, deleteSalary
};
