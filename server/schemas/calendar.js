const mongoose = require("mongoose");

const { Schema } = mongoose;
const {Types: { ObjectId } } = Schema;
const calendarSchema = new Schema({ 
  writer: {
    type: ObjectId,
    required: true, 
    ref: "User" 
  },
  title:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true
  },
  content:{
    type: String, 
    required: true
  }
});

module.exports = mongoose.model("Calendar", calendarSchema);