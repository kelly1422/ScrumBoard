import React, { Component,useEffect } from 'react'
import axios from 'axios';
import Gallery from "react-photo-gallery";
import styles from "./photo.css"
import {Row,Col, Form, Button} from "react-bootstrap";
import $ from "jquery";
import {} from "jquery.cookie";
//import photos from "./photo"

const headers = { withCredentials: true };

var photos = [{
  src:"https://source.unsplash.com/2ShvY8Lf6l0/500x375 500w",
   
  

}];

/* popout the browser and maximize to see more rows! -> */

class ImageUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedFile: null,
    }
    
  }

  

componentWillMount() {

  /* popout the browser and maximize to see more rows! -> */
  
  axios.get("http://172.10.18.151:80/image/").then(res => {
      console.log(res);
      let url = res.config.url.replace("/image","")
      for(var i in res.data.image) {
          photos.push({name:"haha"+i,
          src:url+res.data.image[i],
          desc: ""+i,
        });
      }
        
      console.log(photos);
      })
  }



  handleFileInput(e){
    this.setState({
      selectedFile : e.target.files[0],
    })
  }
  
  handlePost(){
    let formData = new FormData;
    const config = {
	    header: {'content-type': 'multipart/form-data'}
    }
    formData.append("file", this.state.selectedFile);
    return axios.post("http://172.10.18.151:80/image/upload", formData,config).then(res => {
    console.log(res)
      alert(res.data.success ? '성공':'오류')
      window.location.reload();
    }).catch(err => {
        console.log(err)
      alert('실패')
    }).then(() => window.location.reload())
  }

  render() {
    const divStyle = {
      marginTop: 20,
      marginRight: 200,
      marginLeft:200 
    };
    return (
        <div>
      <div style={divStyle}>
        여기에 넣고 싶은 사진을 넣어주세요!
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label visuallyHidden></Form.Label>
          <Form.Control type="file" onChange={e => this.handleFileInput(e) }/>
          <Button type="button" onClick={() => this.handlePost()} size = "sm">사진 업로드</Button>
        </Form.Group>
       </div>
       <div style={divStyle}>
       <div>
            <Row>
                <Col>
                    <div className="row no-gutters">
                    {photos.map((val, k) => {
                        return (
                        <div className="col-sm-4" key={k}>
                            <img src={val.src}  className="photo" />
                        </div>)
                        })
                    }
                     </div>
                </Col>
            </Row>
        </div>
        
      </div>
      </div>
    )
  }
}

export default ImageUpload;