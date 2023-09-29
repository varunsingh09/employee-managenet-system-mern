

const mongoose = require("mongoose"),
  autoIncrement = require("mongoose-auto-increment")
mongoose.set('debug', true)
const mongoURI = process.env.DATABASEURL || 'mongodb://localhost:27017/emp-management';

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);

mongoose.set("useCreateIndex", true);
mongoose
  .connect(mongoURI)
  .then(() => console.log("db connection successful"))
  .catch(err => console.log(err));

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);
autoIncrement.initialize(conn);

