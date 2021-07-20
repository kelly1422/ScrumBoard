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
        start: "2021-07-03",
        end: "2021-07-03",
        title: "1:30pm 스타트업 강연 및 면담",
      },
      {
        start: "2021-07-07",
        end: "2021-07-07",
        title: "1:00pm 1주차 프로젝트 발표",
      },
      {
        start: "2021-07-07",
        end: "2021-07-07",
        title: "3:40pm 서버 기술 세미나",
      },
      {
        start: "2021-07-07",
        end: "2021-07-07",
        title: "4:40pm 본엔젤스 소개",
      },
      {
        start: "2021-07-07",
        end: "2021-07-07",
        title: "5:10pm 조인스타트업 소개",
      },
      {
        start: "2021-07-12",
        end: "2021-07-12",
        title: "3:30pm 인공지능(딥러닝) 세미나",
      },
      {
        start: "2021-07-14",
        end: "2021-07-14",
        title: "12:00pm 2주차 프로젝트 발표",
      },
      {
        start: "2021-07-15",
        end: "2021-07-15",
        title: "3:30pm 창업케이스#1 - 에이팀벤처스",
      },
      {
        start: "2021-07-21",
        end: "2021-07-21",
        title: "1:00pm 3주차 프로젝트 발표",
      },
      {
        start: "2021-07-22",
        end: "2021-07-22",
        title: "3:40pm 창업케이스#2 - ?",
      },
      {
        start: "2021-07-27",
        end: "2021-07-27",
        title: "3:00pm 창업케이스#3 - ?",
      },
      {
        start: "2021-07-30",
        end: "2021-07-30",
        title: "1:00pm 4주차 프로젝트 발표",
      },
      {
        start: "2021-07-30",
        end: "2021-07-30",
        title: "6:00pm 전체 회식",
      },
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
      </div>
    );
  }
}

export default CalendarApp;
