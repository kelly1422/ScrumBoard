import React, { Component } from "react";
import {CKEditor} from 'ckeditor4-react';
import { Button, Form, FormText} from "react-bootstrap";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class NewSchedule extends Component {

  state = {
    data: ""
  };

//   componentDidMount() {
//     if (this.props.location.query !== undefined) {
//       this.calendarTitle.value = this.props.location.query.title;
//     }
//   }

//   componentWillMount(){
//     if (this.props.location.query !== undefined) {
//       this.setState({
//         data: this.props.location.query.content
//       });
//     }
//   }

  writeCalendar = () => {
    let url;
    let send_param;

    const calendarTitle = this.calendarTitle.value;
    const calendarContent = this.state.data;

    if (calendarTitle === undefined || calendarTitle === "") {
      alert("글 제목을 입력 해주세요.");
      this.calendarTitle.focus();
      return;
    } else if (calendarContent === undefined || calendarContent === "") {
      alert("글 내용을 입력 해주세요.");
      this.calendarContent.focus();
    }
    
    if (this.props.location.query !== undefined) {
      url = "http://172.10.18.147:80/calendar/update";
      send_param = {
        headers,
        "_id" : this.props.location.query._id,
        "title": calendarTitle,
        "content": calendarContent
      };
    } else {
      url = "http://172.10.18.147:80/calendar/write";
      send_param = {
        headers,
        "_id" : $.cookie("login_id"),
        "title": calendarTitle,
        "content": calendarContent
      };

    }

    axios
      .post(url, send_param)
      //정상 수행
      .then(returnData => {
        if (returnData.data.message) {
          alert(returnData.data.message);
          window.location.href = "/";
        } else {
          alert("글쓰기 실패");
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };

  onEditorChange = evt => {
    this.setState({
      data:evt.editor.getData()
    });
  };

  render() {
    console.log('new schedule page');
    const divStyle = {
      margin: 50
    };
    const titleStyle = {
      marginBottom: 5
    };
    const buttonStyle = {
      marginTop: 5
    };

    const{isOpen, close} = this.props;

    return (
      <>
          {isOpen ?(
            <div style={divStyle} className="App">
            <h2>new schedule</h2>
            <Form.Control
            type="text"
            style={titleStyle}
            placeholder="New Schedule"
            ref={ref => (this.calendarTitle = ref)}
            />
            <Form.Control 
                type='string'
                placeholder='Date'/>
            <Button style={buttonStyle} onClick={this.writeCalendar} block>
            Save
            </Button></div>
          ): null}
      </>
    );
  }
}

export default NewSchedule;