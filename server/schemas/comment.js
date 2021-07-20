const mongoose = require("mongoose");

const { Schema } = mongoose;
const {Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
    tableId: {
        type:String
    },
    writer: {
        type: ObjectId,
        required: true, //필수적으로 들어와야 하는 값인지 확인
        ref: "User" //writer라는 필드 이름을 User에서 참조해서 사용
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now //디폴트 값
    }
});

module.exports = mongoose.model("Comment", commentSchema);