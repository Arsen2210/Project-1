import React from "react";
import classes from "./task.module.css";
import { Card, Button, InputGroup, FormControl } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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
        this.props.onEdit();
    }

    handleInputChange = (event) => {
        this.setState({
            editText: event.target.value
        })
    }

    saveEdit = () => {
        this.props.onSaveEdit(this.state.editText);
        this.setState({
            isEdit: false,
        })
    }

    cancelEdit = () => {
        this.setState({
            isEdit: false,
            editText: this.props.text
        })
        this.props.onEdit()
    }
    render() {
        const { text } = this.props
        const { isEdit } = this.state
        return (
            <>
                <Card className={classes.CardForm}>
                    <Card.Header>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" onChange={this.props.onCheck} />
                                    </InputGroup.Prepend>
                                    <FormControl aria-label="Text input with checkbox" disabled placeholder="Remove us togeter" />
                                </InputGroup>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{text.slice(0, 6)}</Card.Title>
                        <Card.Text>
                            {isEdit ?
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder="Create new task"
                                        aria-label="Create new task"
                                        aria-describedby="basic-addon2"
                                        type="text"
                                        className={classes.newInput}
                                        value={this.state.editText}
                                        onChange={this.handleInputChange}
                                    />
                                </InputGroup> :
                                <p>{text}</p>
                            }
                        </Card.Text>
                        {/* <FontAwesomeIcon icon={faTrashAlt} /> */}
                        {isEdit ?
                            <>
                                <Button className={classes.newSave} onClick={this.saveEdit} variant="outline-primary">Save</Button>
                                <Button className={classes.newCancel} onClick={this.cancelEdit} variant="outline-primary">Cancel</Button>
                            </> :
                            <>
                                <Button className={classes.newEdit} onClick={this.handleEdit} variant="outline-primary">Edit</Button>
                                <Button className={classes.delButton} onClick={this.props.onDelete} variant="outline-primary">Del</Button>
                            </>
                        }

                    </Card.Body>
                </Card>
            </>
        );
    }
}

