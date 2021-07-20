import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios"; 
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;

const MypageForm = () => {
  const divStyle = {
    margin:5
  };
  const marginBottom = {
    marginBottom : 30,
    marginLeft : 40
  };
  return (
    <>
      <div style={divStyle}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>email</Form.Label>
        <Form.Control type="email" disabled value={$.cookie("login_email")}/>
        <Form.Label>name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" />
        <Form.Label>password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" />
        <Form.Label>new password</Form.Label>
        <Form.Control type="password" placeholder="Enter New Password" />
        <Form.Label>new password check</Form.Label>
        <Form.Control type="password" placeholder="Enter New Password Check" />
      </Form.Group>
      <p></p>
      <p></p>
      <p></p>
      <Button variant="primary"  block style={marginBottom}>
      회원정보 수정
      </Button>
      <Button variant="primary" block style={marginBottom}>
      회원 탈퇴
      </Button>
      </div>
    </>
  );
};

export default MypageForm;