import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class BoardRow extends Component {
    render() {
        return (
            <tr>
            <td>
            <NavLink
                to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
            >
                {this.props.createdAt.substring(0, 10)}
            </NavLink>
            </td>
            <td>
            <NavLink
                to={{ pathname: "/board/detail", query: { _id: this.props._id } }}
            >
                {this.props.title}
            </NavLink>
            </td>
            </tr>
        );
    }
}

class UserDetail extends Component {
  state = {
    boardList: [],
    
    author: ""
  };

  componentDidMount() { //생성자 같은 함수, 이 페이지에 (/board/detail) 에 들어오면 바로 실행되는 느낌
    if (this.props.location.query !== undefined) { //쿼리로 보낸게 없으면 (NavLink 로 이 페이지 주소로 연결할때 주는 쿼리)
      this.getBoardList(this.props.location.query.author);
    } else {
      window.location.href = "/";
    }
  }

  getBoardList = writer => {
    //  console.log(writer);
    const send_param = {
      headers,
      author: writer
    };
    axios
      .post("http://192.249.18.151:80/board/getBoardListUser", send_param)
      .then(returnData => {
        let boardList;
        if (returnData.data.list.length > 0) {
          console.log(returnData.data);
          // console.log(returnData.data.list.length);
          const boards = returnData.data.list;
          boardList = boards.map(item => (
            <BoardRow
              key={Date.now() + Math.random() * 500}
              _id={item._id}
              createdAt={item.createdAt}
              title={item.title}
            ></BoardRow>
          ));
          // console.log(boardList);
          this.setState({
            boardList: boardList,
            author:writer
          });
        } else {
          boardList = (
            <tr>
              <td colSpan="2">작성한 게시글이 존재하지 않습니다.</td>
            </tr>
          );
          this.setState({
            author:writer,
            boardList: boardList
          });
          // window.location.reload();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const divStyle = {
      margin: 100
    };
    const titleStyle = {
      
    };

    
    return (
      <div>
        <h2><strong>{this.state.author} 's Board</strong></h2>
        <div style={divStyle}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>날짜</th>
                <th>글 제목</th>
              </tr>
            </thead>
            <tbody>{this.state.boardList}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default UserDetail;