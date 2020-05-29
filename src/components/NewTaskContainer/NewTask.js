import React from "react";
// import classes from "./newtask.module.css";
import {Button, InputGroup, FormControl} from 'react-bootstrap';
/* import Task from "./Task"; */

export default class NewTask extends React.Component {
    state = {
        inputText: ""
    }
    inputChangeHandler = (event) => {
        this.setState({ inputText: event.target.value });
    }
    buttonClickHandler = () => {
        const { inputText } = this.state;
        if (!inputText) return;
        this.props.onTaskAdd(inputText);
        this.setState({ inputText: " " });
    }
    render() {
        const {disabled}=this.props
        return (
            <>
            <InputGroup className="mb-3">
            <FormControl
              placeholder="Create new task"
              aria-label="Create new task"
              aria-describedby="basic-addon2"
              disabled = {disabled}
              value={this.state.inputText}
              onChange={this.inputChangeHandler}
            />
            <InputGroup.Append>
              <Button 
              variant="outline-primary"
              disabled = {disabled}
              onClick={this.buttonClickHandler}
              >
              Add
              </Button>
            </InputGroup.Append>
          </InputGroup>
            </>
        );
    }

}