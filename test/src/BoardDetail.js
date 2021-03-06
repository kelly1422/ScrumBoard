import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardDetail extends Component {
  state = {
    subject:"",
    board: []
  };

  componentDidMount() { //생성자 같은 함수, 이 페이지에 (/board/detail) 에 들어오면 바로 실행되는 느낌
    if (this.props.location.query !== undefined) { //쿼리로 보낸게 없으면 (NavLink 로 이 페이지 주소로 연결할때 주는)
      this.getDetail();
    } else {
      window.location.href = "/";
    }
  }

  deleteBoard = _id => {
    const send_param = {
      headers,
      _id
    };
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("http://192.249.18.151:80/board/delete", send_param) //보드라우터 가서 딜리트 실행
        //정상 수행
        .then(returnData => {
          alert("게시글이 삭제 되었습니다.");
          window.location.href = "/";
        })
        //에러
        .catch(err => {
          console.log(err);
          alert("글 삭제 실패");
        });
    }
  };

  getDetail = () => {
    const send_param = {
      headers,
      _id: this.props.location.query._id
    };
    const marginBottom = {
      marginBottom: 5
    };
    axios
      .post("http://192.249.18.151:80/board/detail", send_param) //보드 라우터의 디테일 실행 (파람을 보내기)
      //정상 수행
      .then(returnData => { //받아온 보드 데이터들 
        if (returnData.data.board[0]) { //받아온 보드 데이터는 한개이므로 걍 0번째 인덱스로 하면됨
          const board = ( //받아온 보드 데이터를 아래 형식으로 표현
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{returnData.data.board[0].title}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      dangerouslySetInnerHTML={{ //
                        __html: returnData.data.board[0].content
                      }}
                    ></td>
                  </tr>
                </tbody>
              </Table>
              <div>
                <NavLink
                  to={{
                    pathname: "/boardWrite",
                    query: {
                      title: returnData.data.board[0].title,
                      content: returnData.data.board[0].content,
                      _id: this.props.location.query._id
                    }
                  }}
                >
                  <Button block className="my-3">
                    글 수정
                  </Button>
                </NavLink>
                <Button
                  block
                  className="my-3"
                  onClick={this.deleteBoard.bind(
                    null,
                    this.props.location.query._id
                  )}
                >
                  글 삭제
                </Button>
              </div>
            </div>
          );
          this.setState({
            subject: returnData.data.board[0].title,
            board: board //맨위에서 선언한 board : 방금 받아온 board 데이터
          });
        } else {
          alert("글 상세 조회 실패");
        }
      })
      //에러
      .catch(err => {
        console.log(err);
      });
  };

  //onClick={this.getBoard.bind(null,this.props._id)}
  render() {
    const divStyle = {
      marginTop: 30,
      marginLeft:200,
      marginRight:200,
      marginBottom:50
    };
    return (
      <div>
      <h2><strong>Subject : {this.state.subject}</strong></h2>
      <div style={divStyle}>{this.state.board}</div>
      </div>
    ); //this.state.board 에 테이블이 들어감
  }
}

export default BoardDetail;