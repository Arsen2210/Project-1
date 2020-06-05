import React from 'react';
import { Modal, Button, InputGroup, FormControl,Form } from 'react-bootstrap';


class AddModal extends React.Component {

    state = {
        isAdd: false,
        taskTitle:"",
        taskDiscription:""
    }

    inputChangeHandler = (event) => {
        this.setState({ taskTitle: event.target.value });
    }
    textareaCangeHandler=(event)=>{
        this.setState({ taskDiscription: event.target.value })
    }
    buttonClickHandler = () => {
        const { taskTitle,taskDiscription } = this.state;
        if (!taskTitle || !taskDiscription) return;
        this.props.onTaskAdd(taskTitle,taskDiscription);
        this.setState({ taskTitle:"",taskDiscription:"" });
        this.props.onHide()

    }

    render() {
        const { disabled } = this.props;
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Task Adding
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Title"
                                aria-label="Create new task"
                                aria-describedby="basic-addon2"
                                disabled={disabled}
                                value={this.state.taskTitle}
                                onChange={this.inputChangeHandler}
                            />
                            <InputGroup.Append>
                            </InputGroup.Append>
                        </InputGroup>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={this.state.taskDiscription} onChange={this.textareaCangeHandler}  as="textarea" rows="3" />
                        </Form.Group>
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="outline-primary"
                        disabled={disabled}
                        onClick={this.buttonClickHandler}
                    >
                    Add
                    </Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

export default AddModal;