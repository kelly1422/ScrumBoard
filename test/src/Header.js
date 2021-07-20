import React, { Component } from "react";
import { Navbar, Button, Image, Nav, Container} from "react-bootstrap";
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
      .get("http://192.249.18.151:80/member/logout", {
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
      margin: "15px 10px 15px 10px",
    };

    return (
      <div>
        <Navbar Navbar bg="light" expand="lg">
          <Container>
          <Navbar.Brand href="/"><strong><big>SCRUM for Mad Camp</big></strong></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to={{pathname: "/mypage", query: { _id: $.cookie("login_id")}}}>
              <Button variant="primary" style={buttonStyle}>
                Mypage
              </Button>
            </NavLink>
            <NavLink to="/">
              <Button variant="primary" style={buttonStyle}>
                list
              </Button>
            </NavLink>
            <NavLink to="/boardWrite">
              <Button variant="primary" style={buttonStyle}>
                write
              </Button>
            </NavLink>
            <div><Button onClick={this.logout} variant="secondary" style={buttonStyle}>
              logout
            </Button></div>
            
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
        <Image src="./img/check.jpg" fluid />
      </div>
    );
  }
}

export default Header;