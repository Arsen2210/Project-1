import React from "react";
import classes from "./newtask.module.css";
/* import Task from "./Task"; */

export default class NewTask extends React.Component {
    state = {
        inputText: ""
    }
    inputChangeHandler = (event) => {
        this.setState({ inputText: event.target.value });
    }
    buttonClickhandler = () => {
        const { inputText } = this.state;
        if (!inputText) return;
        this.props.onTaskAdd(inputText);
        this.setState({ inputText: " " });
    }
    render() {
        const {disabled}=this.props
        return (
            <>
                <input
                    disabled={disabled}
                    className={classes.Input} 
                    type="text"
                    value={this.state.inputText}
                    onChange={this.inputChangeHandler} />
                <button disabled={disabled} className={classes.newAdd} onClick={this.buttonClickhandler}>Add</button>
            </>
        );
    }

}