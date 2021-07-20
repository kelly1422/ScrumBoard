import React, { Component } from "react";
import { Navbar, Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class Header extends Component {
  state = {
    buttonDisplay: "none"
  };

  componentDidMount() {
    if ($.cookie("login_id")) {
      this.setState({
        buttonDisplay: "block"
      });
    } else {
      this.setState({
        buttonDisplay: "none"
      });
    }
  }

  logout = () => {
    axios
      .get("http://172.10.18.147:80/member/logout", {
        headers
      })
      .then(returnData => {
        if (returnData.data.message) {
          $.removeCookie("login_id"); //쿠키 삭제후
          alert("로그아웃 되었습니다!");
          window.location.href = "/"; //로그아웃하면 초기화면으로 돌아감 (페이지 이동?)
        }
      });
  };
  render() {
    const buttonStyle = {
      margin: "0px 5px 0px 10px",
      display: this.state.buttonDisplay
    };

    const titleStyle ={
      marginLeft: 5,
      fontStyle:'bold'
    }

    return (
      <div>
        <Navbar style={{background:'#eee'}}>
          <Navbar.Brand href="/" style={{titleStyle}}>몰입캠프 스크럼</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            { <NavLink to="/mypage">
              <Button style={buttonStyle} variant="primary">
                회원정보 수정
              </Button>
            </NavLink> }
            <NavLink to="/">
              <Button style={buttonStyle} variant="primary">
                글목록
              </Button>
            </NavLink>
            <NavLink to="/boardWrite">
              <Button style={buttonStyle} variant="primary">
                글쓰기
              </Button>
            </NavLink>
            <Button style={buttonStyle} onClick={this.logout} variant="primary">
              로그아웃
            </Button>
            <NavLink to="/calendar"><Button style={buttonStyle}  variant="primary">
              달력
            </Button></NavLink>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;