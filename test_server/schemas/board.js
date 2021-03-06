const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId } //스키마에서 objectid를 가져와서 type을 object id로 설정 ... 모르게썽
} = Schema;
const boardSchema = new Schema({
  writer: {
    type: ObjectId,
    required: true, //필수적으로 들어와야 하는 값인지 확인
    ref: "User" //writer라는 필드 이름을 User에서 참조해서 사용
  },
  author:{
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imgPath: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now //디폴트 값
  }
});

module.exports = mongoose.model("Board", boardSchema);