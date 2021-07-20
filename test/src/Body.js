import React, { Component } from "react"; //react 안의 컴포넌트를 가져다 쓰겠다...
import LoginForm from "./LoginForm";
import BoardForm from "./BoardForm";
import BoardWriteForm from "./BoardWriteForm";
import BoardDetail from "./BoardDetail";
import UserDetail from "./UserDetail";
import MypageForm from "./MypageForm";
import { Route } from "react-router-dom";
import $ from "jquery";
import {} from "jquery.cookie";

import Calendar from "./CalendarApp";
import NewSchedule from './NewSchedule';

import ImageUpload from "./ImageUpload";
import axios from 'axios';

class Body extends Component { //컴포넌트를 상속받아서 index에서 가져다 쓰겠다
  render() {
    let resultForm;
    function getResultForm() {
      // console.log($.cookie("login_id"));
      if ($.cookie("login_id")) { //쿠키 있으면 게시판 보여주고
        resultForm = <Route exact path="/" component={BoardForm}></Route>;
        return resultForm;
      } else { //없으면 로그인 화면 띄어주기
        resultForm = <Route exact path="/" component={LoginForm}></Route>;
        return resultForm;
      }
    }
    function getphotolist() {
      let photos = [];
        axios.get("http://192.249.18.153:80/image/").then(res => {
          console.log(res);
          let url = res.config.url.replace("/image","")
          for(var i in res.data.image) {
              photos.push({src:url+res.data.image[i],
              width: 400,
              height: 300
              });
          }
        })
        return photos;
      }
    getResultForm();
    getphotolist();
    return (
      <div>
        <Route path="/mypage" component={MypageForm}></Route>
        <Route path="/boardWrite" component={BoardWriteForm}></Route>
        <Route path="/board/detail" component={BoardDetail}></Route>
        <Route path="/board/userDetail" component={UserDetail}></Route>
        
        <Route path="/calendar" component={Calendar}></Route>
        <Route path="/newSchedule" component={NewSchedule}></Route>

        <Route path="/imageupload" component={ImageUpload}></Route>
        {resultForm}
      </div>
    );
  }
}

export default Body; //index에서 import 하려면 export 해줘야함

//클릭하면 그에 맞는 바디페이지로 바비부분만 부분 랜더링 해줌