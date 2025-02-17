const mongoose = require("mongoose");

const connectionString = process.env.DB;
try {
  mongoose
    .connect(connectionString)
    .then(() => console.log("MongoDB Connected"));
} catch (e) {
  console.error(e);
}
module.exports = mongoose;