const mongoose = require("mongoose");

const digramSchema = mongoose.Schema({
  name: String,
  in_house: Boolean,
  is_processed: Boolean,
});

module.exports = mongoose.model("Diagram", digramSchema);
