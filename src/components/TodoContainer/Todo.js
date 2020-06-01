import React, { Component } from 'react';
import classes from './todo.module.css';
import  idGen  from '../../Tools/Tools';
import Task from '../TaskContainer/Task';
import NewTask from '../NewTaskContainer/NewTask';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import TaskModal from '../TaskModal/TaskModal';


class ToDo extends Component {
    constructor(props) {
        super(props);
        console.log('ToDo constructor');
    }
    state = {
        tasks: [],
        taskIds: new Set(),
        isEditing: false,
        openModal: false,
        currentTask: null
    }

    componentDidMount() {
        console.log('ToDo mounted');
    }


    addTask = (inputText) => {
        const tasks = [...this.state.tasks];
        tasks.push({
            id: idGen(),
            text: inputText
        });
        this.setState({ tasks });
    }

    removeButtonHandler = (taskId) => () => {
        const newTasks = this.state.tasks.filter(({ id }) => taskId !== id);
        const newTaskIds = new Set(this.state.taskIds);
        newTaskIds.delete(taskId);

        this.setState({
            tasks: newTasks,
            taskIds: newTaskIds
        });
    }

    handleCheck = (taskId) => () => {
        let taskIds = new Set(this.state.taskIds);

        if (taskIds.has(taskId)) {
            taskIds.delete(taskId);
        }
        else {
            taskIds.add(taskId);
        }
        this.setState({ taskIds });
    }


    removeBulkHandler = () => {
        let { tasks, taskIds } = this.state;

        taskIds.forEach(id => {
            tasks = tasks.filter(task => task.id !== id);
        });

        this.setState({
            tasks,
            taskIds: new Set()
        });

    }

    handleSaveEdit = (id) => (text) => {
        const tasks = JSON.parse(JSON.stringify(this.state.tasks));

        for (let task of tasks) {
            if (task.id === id) {
                task.text = text;
                break;
            }
        }
        this.setState({ tasks, isEditing: false });
    }

    handleEdit = () => {
        this.setState({
            isEditing: !this.state.isEditing,
        });
    }

    selectAllHandler = ()=>{
        const taskIds = this.state.tasks.map(task => task.id);
        this.setState({taskIds: new Set(taskIds)});
    };

    deSelectAllHandler = ()=>{
        this.setState({taskIds: new Set()});
    };

    handleModalClose = ()=>{
        this.setState({
            openModal: false,
            currentTask: null
        });
    }

    handleModalOpen  = (task)=> ()=> {
        console.log(task)
        this.setState({
            openModal: true,
            currentTask: task
        });
    }

    render() {
        // console.log('ToDo render');
      const {tasks, taskIds, isEditing, currentTask} = this.state;

        const tasksArr = tasks.map((task) => {
                return (
                    <Col key={task.id} sm='6' md='4' lg='3' xl='2' >
                        <Task
                            text={task.text}
                            onDelete={this.removeButtonHandler(task.id)}
                            onCheck={this.handleCheck(task.id)}
                            onSaveEdit={this.handleSaveEdit(task.id)}
                            onEdit={this.handleEdit}
                            isSelected = {this.state.taskIds.has(task.id)}
                            onOpenModal = {this.handleModalOpen(task)}
                        />
                    </Col>
                )
            }

            );

        return (
            <>
                <Container className={classes.container}>
                    <Row className={classes.inputRow}>
                        <Col>
                            <NewTask
                                onTaskAdd={this.addTask}
                                disabled={isEditing}
                            />
                        </Col>
                    </Row>


                    <Row>
                        {tasksArr}
                    </Row>

                    <Row className={classes.footerRow}>
                        <Button
                            className='mx-auto'
                            variant='danger'
                            onClick={this.removeBulkHandler}
                            disabled={!taskIds.size}
                        >
                            Remove
                         </Button>
                        {
                            tasks.length !== taskIds.size &&
                            <Button
                            className='mx-auto'
                            variant='secondary'
                            onClick={this.selectAllHandler}
                        >
                            Select all
                         </Button>
                         
                        }

                        { !!taskIds.size &&
                            <Button
                            className='mx-auto'
                            variant='secondary'
                            onClick={this.deSelectAllHandler}
                        >
                            Deselect all
                         </Button>
                        }
                    </Row>
                </Container>
             { currentTask &&  
                <TaskModal
                show = {this.state.openModal}
                onHide = {this.handleModalClose}
                taskData = {currentTask}
                />
            }
            </>
        );
    }
}

export default ToDo;