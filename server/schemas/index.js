const mongoose = require("mongoose");

module.exports = () => { //exports로 내보내주므로 다른 곳에서도 쓸 수 있다.
  const connect = () => {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    mongoose.connect( //몽고디비 연결
      "mongodb://localhost:27017/til",
      {
        dbName: "til" //DB 이름 설정
      },
      error => { //몽고디비 연결 에러
        if (error) {
          console.log("몽고디비 연결 에러", error);
        } else {
          console.log("몽고디비 연결 성공");
        }
      }
    );
  }; 
  connect(); //위의 커넥트 함수(몽고디비 연결함수) 실행
  mongoose.connection.on("error", error => {
    console.log("몽고디비 연결 에러", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.log("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
    connect(); //연결 재시도
  });
  require("./user"); //같은 폴더 내의 user, board도 불러옴.
  require("./board");
  require("./calendar");
};

