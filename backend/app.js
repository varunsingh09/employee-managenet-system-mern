const dotenv = require("dotenv");
const cors = require('cors')
const express = require("express");
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const app = express();
require("./config/db");
dotenv.config();
const { authLimiter } = require('./middleware/rateLimiter');
const roleRoutes = require("./routes/role");
const positionRoutes = require("./routes/position");
const departmentRoutes = require("./routes/department");
const adminRoutes = require("./routes/admin");
const countryRoutes = require("./routes/country");
const stateRoutes = require("./routes/state");
const cityRoutes = require("./routes/city");
const companyRoutes = require("./routes/company");
const employeeRoutes = require("./routes/employee");
const personalInfoRoutes = require("./routes/personalInfo");
const educationRoutes = require("./routes/education");
const salaryRoutes = require("./routes/salary");
const familyInfoRoutes = require("./routes/familyInfo");
const workExperienceRoutes = require("./routes/workExperience");
const leaveApplicationRoutes = require("./routes/leaveApplication");
const leaveApplicationHrRoutes = require("./routes/leaveApplicationHr");
const loginRoutes = require("./routes/login");


app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("*", cors());

app.get("/", (req, res) => {
  res.send("API is Running");
});
console.log('process.env', process.env.NODE_ENV)
// limit repeated failed requests to auth endpoints
if (process.env.NODE_ENV === 'production') {
  app.use(authLimiter);
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/api/role", roleRoutes);
app.use("/api/position", positionRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/country", countryRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/personal-info", personalInfoRoutes);
app.use("/api/family-info", familyInfoRoutes);
app.use("/api/work-experience", workExperienceRoutes);
app.use("/api/leave-application-emp", leaveApplicationRoutes);
app.use("/api/leave-application-hr", leaveApplicationHrRoutes);
app.use("/api/login", loginRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
