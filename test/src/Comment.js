import axios from 'axios';
import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import $ from "jquery";
import {} from "jquery.cookie";

function Comment() {
    const [commentValue, setCommentValue] = useState("");
    let [Comments, setComments]=useState([]);

    const handleClick=(event)=>{  //textarea에서 글 쓸 수 있게 만들어 주는 것 
        setCommentValue(event.currentTarget.value)
    }

    function editComment(content){
        var newComment = [...Comments];
        newComment.push(content);
        setComments(newComment);
    }

    const onSubmit = (event)=>{
        event.preventDefault();

        const send_param ={
            content:commentValue,
            writer:$.cookie("login_id"),
        }

        const url = 'http://172.10.18.147:80/comment/write';

        editComment(commentValue);

        axios.post(url, send_param)
        .then(returnData => {
            if (returnData.data.message) {
              alert(returnData.data.message);
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
            <p>{Comments[0]}</p>
            <p>{Comments[1]}</p>
            <p>{Comments[2]}</p>
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