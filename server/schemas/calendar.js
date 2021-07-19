const mongoose = require("mongoose");

const { Schema } = mongoose;
const calendarSchema = new Schema({ 
  title:{
    type: String,
    required: true
  },
  date:{
    type: String,
  },
  content:{
    type: String, 
    required: true
  }
});

module.exports = mongoose.model("Calendar", calendarSchema);