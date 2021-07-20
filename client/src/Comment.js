import axios from 'axios';
import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import $ from "jquery";
import {} from "jquery.cookie";
import SingleComment from './SingleComment';

function Comment(props) {
    const [commentValue, setCommentValue] = useState("");
    const tableId = props.tableId;

    const handleClick=(event)=>{  //textarea에서 글 쓸 수 있게 만들어 주는 것 
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event)=>{
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

    const buttonStyle = {
        margin: "0px 5px 0px 10px",
    };

    return (
        <div>
            <br/>
            <p>댓글</p>
            <hr/>

            {/* Comment List*/}
            <SingleComment/>
            {/* Root Comment Form*/}

            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea 
                style={{width:'100%', borderRadius:'5px'}}
                onChange={handleClick}
                value={commentValue}
                placeholder='댓글 작성하기'/>

            <br/>
            <Button style={buttonStyle} onClick={onSubmit}>Submit</Button>

            </form>

        </div>
    )
}

export default Comment
