import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { CKEditor } from "ckeditor4-react";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardWriteForm extends Component {
  state = {
    data: ""
  };

  componentDidMount() {
    if (this.props.location.query !== undefined) {
      this.boardTitle.value = this.props.location.query.title;
    }
  }

  componentWillMount(){
    if (this.props.location.query !== undefined) {
      this.setState({
        data: this.props.location.query.content
      });
    }
  }

  writeBoard = () => {
    let url;
    let send_param;

    const boardTitle = this.boardTitle.value;
    const boardContent = this.state.data;

    if (boardTitle === undefined || boardTitle === "") {
      alert("Enter your project title.");
      this.boardTitle.focus();
      return;
    } else if (boardContent === undefined || boardContent === "") {
      alert("Explain your project.");
      return;
    }
    
    if (this.props.location.query !== undefined) { //수정하기 버튼을 통해 들어오면 query를 통해 그 글의  _id 값을 보내줌, 그 값이 있으면 
      url = "http://192.249.18.151:80/board/update";
      send_param = {
        headers,
        "_id" : this.props.location.query._id,
        "title": boardTitle,
        "content": boardContent
      };
    } else {
      url = "http://192.249.18.151:80/board/write"; //새로 작성
      send_param = {
        headers,
        "_id" : $.cookie("login_id"),  //로그인에 성공해서 생성한 login_id 쿠키값으로 방금 새로 작성한 글의 _id 값을 정해줌
        "title": boardTitle,
        "content": boardContent,
        "author" : $.cookie("login_name")
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
      data: evt.editor.getData()
    });
  };

  render() {
    const divStyle = {
      paddingLeft: 150,
      paddingRight: 150
    };
    const titleStyle = {
      marginBottom: 30,
      marginTop: 20
    };
    const buttonStyle = {
      marginTop: 50,
      marginBottom: 80
    };

    return (
      <div style={divStyle} className="App">
        <h2><strong>WriteBoard</strong></h2>
        <Form.Control
          style={titleStyle}
          type="text"
          placeholder="Enter your Scrum Title"
          ref={ref => (this.boardTitle = ref)}
        />
        <CKEditor
          data={this.state.data}
          onChange={this.onEditorChange}
        ></CKEditor>
        <Button block style={buttonStyle} type="button" onClick={this.writeBoard} >
          저장하기
        </Button>
      </div>
    );
  }
}

export default BoardWriteForm;