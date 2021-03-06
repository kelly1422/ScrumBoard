const mongoose = require("mongoose");

const { Schema } = mongoose; //스키마라는 비구조 할당 - 몽구스 안의 스키마 구조를 가져와서 스키마로 할당
const userSchema = new Schema({ //원하는 구조의 스키마를 형성해서 아래에서 모델로 설정
  email: {
    type: String,
    required: true,
    unique: true //이메일이라는 필드는 고유값을 갖는다
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  loginCnt: {
    type: Number,
    default: 0
  },
  lockYn: {
    type: Boolean,
    default: false
  }
}); //스키마 선언

module.exports = mongoose.model("User", userSchema); //위해서 새로 생성한 스키마 구조를 모델로 형성해서 내보내줌 (모델 이름 : User)
//이 모델은 index.js 파일에서 사용