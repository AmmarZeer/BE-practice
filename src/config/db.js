const mongoose = require("mongoose");

async function connectToDB() {
  console.log("here");
  try {
    await mongoose.connect(
      "mongodb+srv://ammar:QAZwsx12!@cluster0.7ylfqqc.mongodb.net/testDB?retryWrites=true&w=majority"
    );
    console.log("connected to DB");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

module.exports = connectToDB;
