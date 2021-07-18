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
      .get("http://172.10.18.151:80/member/logout", {
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

    return (
      <div>
        <Navbar>
          <Navbar.Brand href="/">Today I Learned</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {/* <NavLink to="/mypage">
              <Button style={buttonStyle} variant="primary">
                회원정보 수정
              </Button>
            </NavLink> */}
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
          </Navbar.Collapse>
        </Navbar>
        <Image src="./img/main.png" fluid />
      </div>
    );
  }
}

export default Header;