import React, { Component } from "react";
import "./App.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import AddTodo from "./TaskForm/TaskForm.js";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ChangeStateModal from "./ChangeStateModal/ChangeStateModal";
import Todo from "./ShowTodo/Todo";

import TodoComplete from "./TodoList/TodoComplete.js";
import TodoIncomplete from "./TodoList/TodoIncomplete.js";
import Weather from "./weather/Weather.js"
import ReactModal from "react-modal";


var arrListYes = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [
        {
          title: "ITSS",
          description: "create react app",
          date: "2020-04-07",
          state: -1,
        },
        {
          title: "master japanese",
          description: "have N1",
          date: "2020-04-05",
          state: 1,
        },
        {
          title: "learn react basic",
          description: "learn fundamental react component",
          date: "2020-04-04",
          state: 0,
        },
      ],
      listYesterday: [],
      isModal: false,
      isCalendar: true,
      isToDoList: false,
      isAddToDo: false,
      isTodo: false,
      isWeather: false
    };

    this.focusEvent = {};
    this.renderToDoList = this.renderToDoList.bind(this);
    this.renderAddToDo = this.renderAddToDo.bind(this);
    this.renderWeather = this.renderWeather.bind(this);
  }

  componentDidMount() {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    this.state.toDoList.map((item, i) => {
      if (item.date === date.toISOString().split("T")[0] && item.state === -1)
        arrListYes.push(item);
    });
    if (arrListYes.length > 0)
      this.setState({
        isModal: true,
        listYesterday: arrListYes,
      });
  }

  handlerChangedState = (array) => {
    let arr3 = this.state.toDoList.map((item, i) =>
      Object.assign({}, item, array[i])
    );
    this.setState({ isCalendar: true, toDoList: arr3, isModal: false });
  };

  renderToDoList() {
    this.setState({
      isToDoList: true,
    });
  }

  renderCalendar = () => {
    this.setState({
      isToDoList: false,
    });
  };

  deleteTodo = (index) => {
    let newlist = this.state.toDoList;
    console.log(
      newlist.slice(0, index).concat(newlist.slice(index + 1, newlist.length))
    );
    this.setState({
      toDoList: newlist
        .slice(0, index)
        .concat(newlist.slice(index + 1, newlist.length)),
    });
  };

  renderAddToDo() {
    this.setState({
      isToDoList: false,
      isAddToDo: true,
    });
  }
  
  renderWeather() {
    this.setState({
      isWeather: true
    });
  }

  handlerAddItemToList = (item) => {
    this.setState((prevState) => ({
      isAddToDo: false,
      toDoList: prevState.toDoList.concat(item),
    }));
  };

  handleClickEvent = (info) => {
    this.focusEvent = this.state.toDoList.find(
      (x) => x.title === info.event.title
    );
    this.setState({ isTodo: true });
  };

  closeTodo = () => {
    this.focusEvent = {};
    this.setState({ isTodo: false });
  };

  render() {
    return (
      <div className="App">
        <Container>
          <Row className="Calendar justify-content-md-center">
            <FullCalendar
              defaultView="dayGridMonth"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              header={{
                left: "prev,next today ",
                center: "title ",
                right: "dayGridMonth",
              }}
              events={this.state.toDoList}
              eventClick={(info) => {
                this.handleClickEvent(info);
              }}
              locale = 'ja'
            />
            <Button variant="secondary" onClick={this.renderToDoList}>
              タスクのリスト
            </Button>
            <Button variant="primary" onClick={this.renderAddToDo}>
              タスクを追加
            </Button>
            <Button variant="success" onClick={this.renderWeather}>
              天気
            </Button>
          </Row>

          <ReactModal
            isOpen={this.state.isTodo}
            className="toDo"
            overlayClassName="overlay"
          >
            <Todo content={this.focusEvent} close={this.closeTodo} />
          </ReactModal>
          
           <ReactModal
            isOpen={this.state.isWeather}
            overlayClassName="overlay"
            shouldCloseOnOverlayClick={true}
          >
            <span
                class="close"
                onClick={() =>
                  this.setState({ isWeather: false})
                }
              >
                &times;
            </span>
            <Weather></Weather>
          </ReactModal>

          <ReactModal
            isOpen={this.state.isToDoList}
            className="todoList"
            overlayClassName="overlay"
          >
            <Row className="ListItem justify-content-md-center">
              <Col sm={12} className="title">
                <h1>やることリスト</h1>
              </Col>
              <TodoComplete
                list={this.state.toDoList}
                delete={this.deleteTodo}
              />
              <TodoIncomplete
                list={this.state.toDoList}
                delete={this.deleteTodo}
              />

              <Button variant="primary" onClick={this.renderAddToDo}>
                新しいタスクを作成する
              </Button>
              <Button
                className="justify-content-md-center"
                variant="primary"
                onClick={this.renderCalendar}
              >
                カレンダーに戻る
              </Button>
            </Row>
          </ReactModal>

          <ReactModal
            isOpen={this.state.isAddToDo}
            className="addTodo"
            overlayClassName="addTodo_overlay"
            shouldCloseOnOverlayClick={true}
          >
            <div className="addTodo-content">
              <span
                class="close"
                onClick={() =>
                  this.setState({ isToDoList: false, isAddToDo: false })
                }
              >
                &times;
              </span>
              <AddTodo addItem={this.handlerAddItemToList} />
            </div>
          </ReactModal>
          <ChangeStateModal
            content={{
              className: "change-state-modal",
              title: "Check your work yesterday",
              message: "You completed your work?",
            }}
            toDoList={this.state.listYesterday}
            modalIsOpen={this.state.isModal}
            handlerChangedState={this.handlerChangedState}
          />
        </Container>
      </div>
    );
  }
}

export default App;
