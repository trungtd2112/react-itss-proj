import React, { Component } from "react";
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import "./Todo.css"

class Todo extends Component {
  render() {
    console.log(this.props)
    return (
      <Row className="todo">
        <div className="backdrop"></div>
        <div className="content">
          <h2 className="title">タスクの説明</h2>
          <div className="Todo card-body">
            <div className="Todo-title card-title">
              <p>タスク名: {this.props.content.title}</p>
            </div>
            <div className="Todo-description card-text">
              タスクの説明 : <br/>
              {this.props.content.description}
            </div>
            <div className="Todo-description card-text">
              タスクの状態: <br/>
              {this.props.content.state === 1 ? 'Completed' : 'Incompleted'}
            </div>
            <div className="Todo-date card-date">{this.props.content.date}</div>
          </div>
          <Button onClick={this.props.close}>
            クローズ
          </Button>
        </div>
      </Row>
    )
  }
}

export default Todo;