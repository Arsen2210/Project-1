import React, { Component } from 'react';
import Task from '../../TaskContainer/Task';
import Search from '../../Search/Search';
import {connect} from 'react-redux';
import getTasks from '../../../store/actions/gettasks';
import addTask from '../../../store/actions/addtask';
import editTask from '../../../store/actions/edittask'
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap';
import TaskModal from '../../TaskModal/TaskModal';
import Modal from '../../Modal';
import classes from './todo.module.css';



class ToDo extends Component {

    state = {
        taskIds: new Set(),
        isEditing: false,
        taskIndex: null,
        editTaskIndex: null,
        showAddTaskModal: false,
        showEditTaskModal: false
    }

    componentDidMount() {
        this.props.getTasks()
    }

    componentDidUpdate(prevProps,newProps){
        const searchStr = this.props.location.search;
        if(prevProps.location.search !== searchStr){
            this.props.getTasks(searchStr);
        } 
    }

    addTask = (taskData) => {
        this.props.addTask(taskData);
        this.setState({showAddTaskModal: false})
    }

    removeButtonHandler = (taskId) => () => {
        fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'Delete',
        })
        .then(res => res.json())
        .then(response => {
            if(response.error){
                throw response.error;
            }
            if(response.success){
                this.props.enqueueSnackbar('Task deleted successfully', { 
                    variant: 'success',
                });
            }
            else {
                throw new Error('Something went wrong, please, try again later!');
            }
            

            const tasks = [...this.props.tasks];
            const taskIndex = tasks.findIndex(task => task.id === response.id);
            tasks[taskIndex] = response;
            this.setState({
                tasks,
                showEditTaskModal: false
            });
        })
        .catch(error => {
            this.props.enqueueSnackbar(error.toString(), { 
                variant: 'error',
            });
        });


        const newTasks = this.props.tasks.filter(({ id }) => taskId !== id);
        const newTaskIds = new Set(this.state.taskIds);
        newTaskIds.delete(taskId);

        this.setState({
            tasks: newTasks,
            taskIds: newTaskIds,
            taskIndex: null
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
        let { taskIds } = this.state;
        const SelectedtaskIds = Array.from(taskIds);
        fetch(`http://localhost:3001/tasks`, {
            method: 'DELETE',
            body: JSON.stringify({tasks: SelectedtaskIds}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(response);
            if(response.error){
                throw response.error;
            }
            if(response.success){
                this.props.enqueueSnackbar(`${SelectedtaskIds.length} ${SelectedtaskIds.length===1?'task':'tasks'} deleted successfully`, { 
                    variant: 'success', 
                });
            }
            else {
                throw new Error('Something went wrong, please, try again later!');
            }
            
            let tasks = [...this.state.tasks];
            taskIds.forEach(id => {
                tasks = tasks.filter(task => task.id !== id);
            });
    
            this.setState({
                tasks,
                taskIds: new Set()
            }); 
        })
        .catch(error => {
            this.props.enqueueSnackbar(error.toString(), { 
                variant: 'error',
            });
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

    handleEdit = (taskId) => {
        this.setState({
            showEditTaskModal: true,
            editTaskIndex: this.props.tasks.findIndex(el=> el.id === taskId),
        });
    }

    selectAllHandler = () => {
        const taskIds = this.state.tasks.map(task => task.id);
        this.setState({ taskIds: new Set(taskIds) });
    };

    deSelectAllHandler = () => {
        this.setState({ taskIds: new Set() });
    };

    handleModalClose = () => {
        this.setState({
            taskIndex: null
        });
    }

    handleModalOpen = (taskIndex) => () => {
        this.setState({
            taskIndex: taskIndex
        });
    }

    toggleTaskModal = (type)=>() => {
        this.setState({ [`show${type}TaskModal`]: !this.state[`show${type}TaskModal`] });
    };

    editTask = (taskId, taskData)=>{
        this.props.editTask(taskId,taskData)
        this.setState({
            showEditTaskModal: false
        });
    };


    searchTasks = (data) =>{
        let query = '';

        for(let key in data){
            if(data[key]){
                query+= `${key}=${data[key]}&`
            } 
        }
        
        this.props.history.push(`/?${query}`);
        fetch(`http://localhost:3001/tasks?${query}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then((data)=>{
                if(data.error){
                    throw data.error;
                }
                this.setState({ tasks: data });
            })
            .catch(error => {
                this.props.enqueueSnackbar(error.toString(), { 
                    variant: 'error',
                });
            });
    };

    render() {
        const {taskIds, taskIndex } = this.state;
        const tasks=this.props.tasks
        const tasksArr = tasks.map((task, index) => {
            return (
                <Col key={task.id} sm='6' md='4' lg='3' xl='2' >
                    <Task
                        data={task}
                        onDelete={this.removeButtonHandler(task.id)}
                        onCheck={this.handleCheck(task.id)}
                        onSaveEdit={this.handleSaveEdit(task.id)}
                        onEdit={this.handleEdit}
                        isSelected={this.state.taskIds.has(task.id)}
                        onOpenModal={this.handleModalOpen(index)}
                    />
                </Col>
            )
        }

        );

        return (
            <>
                <Container fluid>
                    <Row className={classes.inputRow}>
                        <Col>
                            <Search 
                            onSubmit = {this.searchTasks}
                            />
                            <Button
                                className={`mx-auto ${classes.addButton}`}
                                variant='primary'
                                onClick={this.toggleTaskModal('Add')}
                            >
                            Add task
                            </Button>
                        </Col>
                    </Row>


                    <Row className={classes.addButton}>
                        {tasksArr.length ? 
                            tasksArr :
                            <p>There are no tasks yet!</p>
                        }
                    </Row>

                    <Row>
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

                        {!!taskIds.size &&
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
                {taskIndex !== null &&
                    <TaskModal
                        show={taskIndex !== null}
                        onHide={this.handleModalClose}
                        taskData={tasks[taskIndex]}
                        onDelete={this.removeButtonHandler(tasks[taskIndex].id)}
                        onSaveEdit={this.handleSaveEdit(tasks[taskIndex].id)}
                        onEdit={this.handleEdit}
                    />
                }

                <Modal
                    type = 'add'
                    open={this.state.showAddTaskModal}
                    onHide={this.toggleTaskModal('Add')}
                    onAddTask={this.addTask}
                />
                <Modal
                    type = 'edit'
                    data = {tasks[this.state.editTaskIndex]}
                    open={this.state.showEditTaskModal}
                    onHide={this.toggleTaskModal('Edit')}
                    onAddTask={this.addTask}
                    onEditTask = {this.editTask}
                />
     
            </>
        );
    }
}
 
const mapStateToProps=(state)=>{
    return{
        tasks:state.tasks
    }
}

const mapDispatchtoProps={
    getTasks,
    addTask,
    editTask
}



export default connect(mapStateToProps,mapDispatchtoProps)(ToDo);