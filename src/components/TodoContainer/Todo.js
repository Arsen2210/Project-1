import React from "react"
import Task from "../TaskContainer/Task"
import idGenerator from "../../Tools"
import NewTask from "../NewTaskContainer/NewTask"
import classes from "./todo.module.css";
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';

export default class Todo extends React.Component {

    state = {
        tasks: [],
        taskIds: new Set(),
        isEditing: false
    }

    addTask = (inputText) => {
        const tasks = [...this.state.tasks];
        tasks.push({
            id: idGenerator(),
            text: inputText
        });
        this.setState({ tasks });
    }

    removeButtonHandler = (taskId) => () => {
        const newTask = this.state.tasks.filter(({ id }) => taskId !== id);
        const newtaskIds = new Set(this.state.taskIds);
        newtaskIds.delete(taskId);

        this.setState({
            tasks: newTask,
            taskIds: newtaskIds
        });
    }

    handleCheck = (taskId) => () => {
        let taskIds = new Set(this.state.taskIds);
        if (taskIds.has(taskId)) {
            taskIds.delete(taskId)
        }
        else {
            taskIds.add(taskId);
        }
        this.setState({ taskIds })
    }

    removeBulkHandler = () => {
        let { tasks, taskIds } = this.state;
        taskIds.forEach(id => {
            tasks = tasks.filter(task => task.id !== id);
        });
        this.setState({
            tasks,
            taskIds: new Set()
        })
    }

    handleSaveEdit = (id) => (text) => {
        const tasks = JSON.parse(JSON.stringify(this.state.tasks));

        for (let task of tasks) {
            if (task.id === id) {
                task.text = text
                break
            }
        }
        this.setState({ tasks, isEditing: false })
    }

    handleEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing,
        });
    }
    selectBulkHandler=()=>{
        const {tasks}=this.state
        const {taskIds}=this.state
        tasks.forEach(elem => {
            taskIds.add(elem.id);
        });
        this.setState({
            tasks:tasks,
            taskIds: taskIds
        });


    }
    render() {
        const tasks = this.state.tasks.map(({ id, text }) => {
            return (
                <Task
                    key={id}
                    text={text}
                    onDelete={this.removeButtonHandler(id)}
                    onCheck={this.handleCheck(id)}
                    onSaveEdit={this.handleSaveEdit(id)}
                    onEdit={this.handleEdit}
                />);
        });
        return (
            <>
            <Container className={classes.Container}>
                <Row className={classes.inputRow}>
                    <Col>
                        <NewTask
                            onTaskAdd={this.addTask}
                            disabled={this.state.isEditing}
                        />
                    </Col>
                </Row>


                <Row>
                    {tasks}
                </Row>

                <Row>
                    <Button
                        className={classes.buttonRemoveAll}
                        variant='danger'
                        onClick={this.removeBulkHandler}
                        disabled={!this.state.taskIds.size || this.state.isEditing}>
                        Remove
                    </Button>
                    <Button
                        className={classes.buttonSelectAll}
                        variant='danger'
                        onClick={this.selectBulkHandler}
                        disabled={!(this.state.tasks.length>=2) || this.state.isEditing}>
                        SelectAll
                    </Button>
                </Row>
            </Container>
        </>
        );
    }
}