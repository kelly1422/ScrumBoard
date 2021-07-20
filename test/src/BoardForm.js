import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;

class BoardRow extends Component {
  render() {
    return (
      <tr font-color="black">
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
        <td>
        <NavLink
            to={{ pathname: "/board/userDetail", query: { author: this.props.author } }}
          >
            {this.props.author}
          </NavLink>
        </td>
      </tr>
    );
  }
}

class BoardForm extends Component {
  state = {
    boardList: []
  };

  componentDidMount() {
    this.getBoardList();
  }

  getBoardList = () => {
    axios
      .post("http://192.249.18.151:80/board/getBoardList")
      .then(returnData => {
        let boardList;
        console.log(returnData.data);
        if (returnData.data.list.length > 0) {
          // console.log(returnData.data.list.length);
          const boards = returnData.data.list;
          boardList = boards.map(item => (
            <BoardRow
              key={Date.now() + Math.random() * 500}
              _id={item._id}
              createdAt={item.createdAt}
              title={item.title}
              author={item.author}
            ></BoardRow>
          ));
          // console.log(boardList);
          this.setState({
            boardList: boardList
          });
        } else {
          boardList = (
            <tr>
              <td colSpan="3">작성한 게시글이 존재하지 않습니다.</td>
            </tr>
          );
          this.setState({
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
      marginTop:65,
      marginLeft:180,
      marginRight:200,
      marginBottom:160
    };

    return (
      <div>
        <h1><strong>SCRUM BOARD</strong></h1>
        <p>현재까지의 진행상황을 작성해 주세요</p>
        <div style={divStyle}>
          <Table warning striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>{this.state.boardList}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default BoardForm;