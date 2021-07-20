import React, {useState} from 'react';
import {Comment,Button, Input} from 'antd';
import $ from "jquery";
import axios from 'axios';
import {Table} from 'react-bootstrap'
//import {Button} from 'react-bootstrap';

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

const {TextArea}=Input;

function SingleComment() {
    const tableId = this.props.tableId;
    const [OpenReply, setOpenReply] = useState(false);
    const [commentValue, setCommentValue] = useState("");

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const actions =[
        <span onCLick={onClickReplyOpen} key="comment-basic-reply-to">Reply</span>
    ]

    const buttonStyle = {
        margin: "0px 5px 0px 10px",
    };

    const onHandleChange = (event) =>{
        setCommentValue(event.currentTarget.commentValue)
    }

    const onSubmit = (event) =>{
        event.preventDefault();

        const send_param ={
            content:commentValue,
            writer:$.cookie("login_id"),
            tableId: tableId
        }

        const url = 'http://172.10.18.147:80/comment/write';

        axios.post(url, send_param)
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
    }

    const getComments = ()=>{
        const send_param = {
            headers,
            _id: this.props.location.query._id
          };
        axios
      .post("http://172.10.18.147:80/board/detail", send_param) //보드 라우터의 디테일 실행 (파람을 보내기)
      //정상 수행
      .then(returnData => { //받아온 보드 데이터들 
        if (returnData.data.comment[0]) { //받아온 보드 데이터는 한개이므로 걍 0번째 인덱스로 하면됨
          const board = ( //받아온 보드 데이터를 아래 형식으로 표현
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>{returnData.data.comment[0].title}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      dangerouslySetInnerHTML={{ 
                        __html: returnData.data.comment[0].content
                      }}
                    ></td>
                  </tr>
                </tbody>
              </Table> 
              </div>)
        }
    })
  
    return (
        <div>
            <Comment
            actions={actions}
            author
            content
            />

            {OpenReply &&
                <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea 
                style={{width:'100%', borderRadius:'5px'}}
                onChange={onHandleChange}
                value={commentValue}
                placeholder='대댓글 작성하기'/>

                <br/>
                <Button style={buttonStyle} onClick={onSubmit}>Submit</Button>

                </form>
            }
            

        </div>
    )
}
}

export default SingleComment
