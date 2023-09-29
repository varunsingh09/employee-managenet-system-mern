
const Joi = require("joi");

const EmployeeValidation = Joi.object().keys({
    RoleID: Joi.optional(),
    PositionID: Joi.optional(),
    DepartmentID: Joi.optional(),
    SalaryID: Joi.optional(),
    FirstName: Joi.string()
        .max(200)
        .required(),
    middlename: Joi.string()
        .max(200)
        .required(),
    lastname: Joi.string()
        .max(200)
        .required(),
    email: Joi.string()
        .max(200)
        .required(),
    password: Joi.string()
        .max(100)
        .required(),
    gender: Joi.string()
        .max(100)
        .required(),
    dob: Joi.date().required(),
    dateofjoining: Joi.date().required(),
    terminatedate: Joi.date().optional(),
    deleted: Joi.optional(),
    photo: Joi.optional(),
    contactno: Joi.string()
        .max(20)
        .required(),
    employeecode: Joi.string()
        .max(100)
        .required(),
    account: Joi.number()
        .max(3)
        .required()
});
const EmployeeValidationUpdate = Joi.object().keys({
    RoleID: Joi.optional(),
    PositionID: Joi.optional(),
    DepartmentID: Joi.optional(),
    SalaryID: Joi.optional(),
    FirstName: Joi.string()
        .max(200)
        .required(),
    middlename: Joi.string()
        .max(200)
        .required(),
    lastname: Joi.string()
        .max(200)
        .required(),
    email: Joi.string()
        .max(200)
        .required(),
    gender: Joi.string()
        .max(100)
        .required(),
    dob: Joi.date().required(),
    dateofjoining: Joi.date().required(),
    terminatedate: Joi.date().optional(),
    deleted: Joi.optional(),
    photo: Joi.optional(),
    contactno: Joi.string()
        .max(20)
        .required(),
    employeecode: Joi.string()
        .max(100)
        .required(),
    account: Joi.number()
        .max(3)
        .required()
});
const EmployeePersonalInfoValidation = Joi.object().keys({
    bloodgroup: Joi.string()
        .max(10)
        .required(),
    dob: Joi.date().required(),

    contactno: Joi.string()
        .max(20)
        .required(),
    email: Joi.string()
        .max(200)
        .required(),
    emergencycontactno: Joi.string()
        .max(20)
        .required(),
    gender: Joi.string()
        .max(100)
        .required(),
    hobbies: Joi.string()
        .max(1000)
        .required(),
    pancardno: Joi.string()
        .max(50)
        .required(),
    permanetaddress: Joi.string()
        .max(200)
        .required(),
    presentaddress: Joi.string()
        .max(200)
        .required()
});
const CityValidation = Joi.object().keys({
    _id: Joi.optional(),
    StateID: Joi.optional(),
    CityName: Joi.string()
        .max(200)
        .required()
});
const CompanyValidation = Joi.object().keys({
    _id: Joi.optional(),
    CityID: Joi.optional(),
    CompanyName: Joi.string()
        .max(200)
        .required(),
    Address: Joi.string()
        .max(2000)
        .required(),
    PostalCode: Joi.number()
        .max(999999)
        .required(),
    Website: Joi.string()
        .max(2000)
        .required(),
    email: Joi.string()
        .max(1000)
        .required(),
    ContactPerson: Joi.string()
        .max(200)
        .required(),
    contactno: Joi.string()
        .max(20)
        .required(),
    FaxNo: Joi.string()
        .max(100)
        .required(),
    PanNo: Joi.string()
        .max(200)
        .required(),
    GSTNo: Joi.string()
        .max(200)
        .required(),
    CINNo: Joi.string()
        .max(200)
        .required(),
    deleted: Joi.optional()
});
const CountryValidation = Joi.object().keys({
    _id: Joi.optional(),
    CountryID: Joi.optional(),
    CountryName: Joi.string()
        .max(200)
        .required()
});
const DepartmentValidation = Joi.object().keys({
    DepartmentName: Joi.string()
        .max(200)
        .required(),
    CompanyID: Joi.required()
});
const EducationValidation = Joi.object().keys({
    SchoolUniversity: Joi.string()
        .max(200)
        .required(),
    Degree: Joi.string()
        .max(200)
        .required(),
    Grade: Joi.string()
        .max(50)
        .required(),
    PassingOfYear: Joi.string()
        .max(10)
        .required()
});
const FamilyInfoValidation = Joi.object().keys({
    Name: Joi.string()
        .max(200)
        .required(),
    Relationship: Joi.string()
        .max(200)
        .required(),
    dob: Joi.date().required(),
    Occupation: Joi.string()
        .max(100)
        .required()
});
const WorkexperienceValidation = Joi.object().keys({
    CompanyName: Joi.string()
        .max(200)
        .required(),
    Designation: Joi.string()
        .max(200)
        .required(),
    FromDate: Joi.date().required(),
    ToDate: Joi.date().required()
});
const StateValidation = Joi.object().keys({
    _id: Joi.optional(),
    CountryID: Joi.optional(),
    StateName: Joi.string()
        .max(200)
        .required()
});
const RoleValidation = Joi.object().keys({
    RoleName: Joi.string()
        .max(200)
        .required(),
    CompanyID: Joi.required()
});
const ProjectValidation = Joi.object().keys({
    _id: Joi.optional(),
    ID: Joi.optional(),
    CreatedBy: Joi.optional(),
    CreatedDate: Joi.optional(),
    deleted: Joi.optional(),
    EmpFullName: Joi.string()
        .max(200)
        .optional(),
    EstimatedCost: Joi.optional(),
    EstimatedTime: Joi.optional(),
    ModifiedBy: Joi.optional(),
    ModifiedDate: Joi.optional(),
    ProjectDesc: Joi.string()
        .max(2000)
        .optional(),
    ProjectTitle: Joi.string()
        .max(200)
        .required(),
    ProjectURL: Joi.string()
        .max(1000)
        .optional(),
    Remark: Joi.string()
        .max(2000)
        .optional(),
    ResourceID: Joi.optional(),
    Status: Joi.number()
        .max(10)
        .required(),
    portal: Joi.optional(),
    Portal_ID: Joi.optional()
});
const LeaveapplicationValidation = Joi.object().keys({
    Leavetype: Joi.string()
        .max(100)
        .required(),

    FromDate: Joi.date().required(),
    ToDate: Joi.date().required(),
    Reasonforleave: Joi.string()
        .max(100)
        .required(),
    Status: Joi.number()
        .max(1)
        .required()
});
const LeaveapplicationHRValidation = Joi.object().keys({
    Status: Joi.number()
        .max(3)
        .required()
});
const PortalValidation = Joi.object().keys({
    _id: Joi.optional(),
    ID: Joi.optional(),
    CreatedBy: Joi.optional(),
    CreatedDate: Joi.optional(),
    deleted: Joi.optional(),
    ModifiedBy: Joi.optional(),
    ModifiedDate: Joi.optional(),
    PortalName: Joi.string()
        .max(200)
        .required(),
    Status: Joi.number()
        .max(1)
        .required()
});
const SalaryValidation = Joi.object().keys({
    BasicSalary: Joi.string()
        .max(20)
        .required(),
    BankName: Joi.string()
        .max(200)
        .required(),
    accountNo: Joi.string()
        .max(200)
        .required(),
    accountHolderName: Joi.string()
        .max(200)
        .required(),
    IFSCcode: Joi.string()
        .max(200)
        .required(),
    TaxDeduction: Joi.string()
        .max(100)
        .required()
});

const PositionValidation = Joi.object().keys({
    PositionName: Joi.string()
        .max(200)
        .required(),
    CompanyID: Joi.required()
});

module.exports = {
    PositionValidation, SalaryValidation, PortalValidation, LeaveapplicationHRValidation, LeaveapplicationValidation,
    ProjectValidation, RoleValidation, StateValidation, WorkexperienceValidation, FamilyInfoValidation, EducationValidation,
    DepartmentValidation, CountryValidation, CompanyValidation, CityValidation, EmployeePersonalInfoValidation,
    EmployeeValidationUpdate, EmployeeValidation
}