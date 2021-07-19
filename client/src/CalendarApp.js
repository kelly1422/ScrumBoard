import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import {Button} from 'react-bootstrap';
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { NavLink } from "react-router-dom";
import "./App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from 'axios';
import NewSchedule from "./NewSchedule";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

class CalendarApp extends Component {
  state = {
    events: [
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "어떻게 하는거지...ㅠ",
      },
      {
        title:"집 가는 날",
        start: "2021-07-31",
        end:"2021=07-31"
      }
    ],
  };

  _getEvents = async()=>{
    const events = await this.axiosEvents();
    this.setState({events})
  }

  _axiosEvents = ()=>{
    return axios.post('/detail').then(res=>res.data)
  }

  onEventResize = (data) => {
    const { start, end } = data;

    this.setState((state) => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: [...state.events] };
    });
  };

  onEventDrop = (data) => {
    console.log(data);
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  
  render() {
    const marginBottom = {
      marginBottom: 5
    };
    const buttonStyle = {
      margin: "10px 10px 10px 10px",
      display: this.state.buttonDisplay
    };


    return (
      <div className="App">
        
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={this.state.events}
          localizer={localizer}
          onEventDrop={this.onEventDrop}
          onEventResize={this.onEventResize}
          resizable
          style={{ height: "100vh", paddingTop:"50px" , paddingLeft:"50px", paddingRight:"50px"}}
        />
          <Button block style={marginBottom,buttonStyle} onClick={this.openModal}>
          일정 추가
          </Button>
          <NewSchedule isOpen={this.state.isModalOpen} close={this.closeModal}/>
      </div>
    );
  }
}

export default CalendarApp;
