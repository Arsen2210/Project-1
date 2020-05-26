import React from "react";
import classes from "./task.css";
// import { render } from "@testing-library/react";

export default class Task extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            editText: props.text
        }
    }

    handleEdit = () => {
        this.setState({
            isEdit: true,
        })
    }

    handleInputChange = (event) => {
        this.setState({
            editText: event.target.value
        })
    }

    saveEdit = () => {
        this.props.onEdit(this.state.editText);
        this.setState({
            isEdit: false,
        })

    }

    cancelEdit = () => {
        this.setState({
            isEdit: false,
            editText: this.props.text
        })
    }

    render() {
        const { text } = this.props
        const { isEdit } = this.state
        return (
            <div className={classes.taskDiv} >
                <h3>{text.slice(0, 6)}</h3>
                {isEdit ?
                    <input type="text" className={classes.newInput} value={this.state.editText} onChange={this.handleInputChange} /> :
                    <p>{text}</p>
                }
                {isEdit ?
                    <>
                        <button className={classes.newSave} onClick={this.saveEdit}>Save</button>
                        <button className={classes.newCancel} onClick={this.cancelEdit}>Cancel</button>
                    </> :
                    <>
                        <button className={classes.delButton} onClick={this.props.onDelete}>Del</button>
                        <button className={classes.newEdit} onClick={this.handleEdit}>Edit</button>
                    </>
                }
                <input
                    type="checkbox"
                    onChange={this.props.onCheck}
                />
            </div>
        );
    }
}

