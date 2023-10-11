
const Joi = require("joi");
const LoginValidation = Joi.object().keys({
    email: Joi.string().email()
        .max(200)
        .required().label("Email can not leave empty"),
    password: Joi.string()
        .max(100)
        .required().label("Password can not leave empty")
});
const EmployeeValidation = Joi.object().keys({
    RoleID: Joi.optional(),
    PositionID: Joi.optional(),
    DepartmentID: Joi.optional(),
    SalaryID: Joi.optional(),
    FirstName: Joi.string()
        .max(200)
        .required(),
    MiddleName: Joi.string()
        .max(200)
        .required(),
    LastName: Joi.string()
        .max(200)
        .required(),
    Email: Joi.string()
        .max(200)
        .required(),
    Password: Joi.string()
        .max(100)
        .required(),
    Gender: Joi.string()
        .max(100)
        .required(),
    DOB: Joi.date().required(),
    DateOfJoining: Joi.date().required(),
    TerminateDate: Joi.date().optional(),
    deleted: Joi.optional(),
    photo: Joi.optional(),
    ContactNo: Joi.string()
        .max(20)
        .required(),
    EmployeeCode: Joi.string()
        .max(100)
        .required(),
    Account: Joi.number()
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
    MiddleName: Joi.string()
        .max(200)
        .required(),
    LastName: Joi.string()
        .max(200)
        .required(),
    Email: Joi.string()
        .max(200)
        .required(),
    Gender: Joi.string()
        .max(100)
        .required(),
    DOB: Joi.date().required(),
    DateOfJoining: Joi.date().required(),
    TerminateDate: Joi.date().optional(),
    deleted: Joi.optional(),
    photo: Joi.optional(),
    ContactNo: Joi.string()
        .max(20)
        .required(),
    EmployeeCode: Joi.string()
        .max(100)
        .required(),
    Account: Joi.number()
        .max(3)
        .required()
});
const EmployeePersonalInfoValidation = Joi.object().keys({
    BloodGroup: Joi.string()
        .max(10)
        .required(),
    DOB: Joi.date().required(),

    ContactNo: Joi.string()
        .max(20)
        .required(),
    Email: Joi.string()
        .max(200)
        .required(),
    EmergencyContactNo: Joi.string()
        .max(20)
        .required(),
    Gender: Joi.string()
        .max(100)
        .required(),
    Hobbies: Joi.string()
        .max(1000)
        .required(),
    PANcardNo: Joi.string()
        .max(50)
        .required(),
    PermanetAddress: Joi.string()
        .max(200)
        .required(),
    PresentAddress: Joi.string()
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
    Email: Joi.string()
        .max(1000)
        .required(),
    ContactPerson: Joi.string()
        .max(200)
        .required(),
    ContactNo: Joi.string()
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
    CountryId: Joi.optional(),
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
    DOB: Joi.date().required(),
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
const LeaveApplicationHrValidation = Joi.object().keys({
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
    AccountNo: Joi.string()
        .max(200)
        .required(),
    AccountHolderName: Joi.string()
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
    PositionValidation, SalaryValidation, PortalValidation, LeaveApplicationHrValidation, LeaveapplicationValidation,
    ProjectValidation, RoleValidation, StateValidation, WorkexperienceValidation, FamilyInfoValidation, EducationValidation,
    DepartmentValidation, CountryValidation, CompanyValidation, CityValidation, EmployeePersonalInfoValidation,
    EmployeeValidationUpdate, EmployeeValidation, LoginValidation
}