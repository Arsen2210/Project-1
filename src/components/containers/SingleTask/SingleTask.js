import React  from 'react';
import classes from './style.module.css';
import { formatDate } from '../../../Tools/Tools';
import { Button, Card, } from 'react-bootstrap';
import { connect } from 'react-redux';
import singelTaskGet from '../../../store/actions/singletask';
import delTask from '../../../store/actions/deletetask';
import SingleTaskEdit from '../../../store/actions/SingleTaskEdit'
import PropTypes from 'prop-types';
import Modal from '../../Modal'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';
// import {formatDate} from '../../../Tools/Tools';

class SingleTask extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            modal:false,
        }
    }

    componentDidMount() {
        const taskId = this.props.match.params.id;
        this.props.singelTaskGet(taskId)
    }
    componentDidUpdate(prevProps){
        return prevProps===this.props
    }

    editTask=(id,data)=>{
        this.props.SingleTaskEdit(id,data)
        this.toggleModal()
    }

    toggleModal=()=>{
        this.setState({
            modal:!this.state.modal
        })
    }

    deleteTask = () => {
        const taskId = this.props.match.params.id;
        this.props.delTask(taskId)
        this.props.history.push('/')
    };

    render() {
        const { singleTask } =this.props
        return (
            <>
                {singleTask &&
                <>
                    <h1 className={classes.heading}>Single task page</h1>
                    <Card>
                        <Card.Header>

                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{singleTask.title}</Card.Title>
                            <Card.Text>
                                {singleTask.description}
                            </Card.Text>
                            <Card.Text className={classes.date}>
                            Creation date {formatDate(singleTask.created_at)}
                            </Card.Text>
                            <Card.Text className={classes.date}>
                            Creation date {formatDate(singleTask.date)}
                            </Card.Text>

                        </Card.Body>
                    </Card>
                    <Button
                        variant="danger"
                        onClick={this.deleteTask}
                        disabled={!singleTask}
                        className={classes.button}
                    >
                        Delete task
                </Button>
                <Button
                        variant="primary"
                        onClick={this.toggleModal}
                        disabled={!singleTask}
                        className={classes.button}
                    >
                        EditTask
                </Button>
                </>

             }
                <Modal
                    type='edit'
                    data={singleTask}
                    open={this.state.modal}
                    onHide={this.toggleModal}
                    onEditTask={this.editTask}
                />
            </>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        singleTask: state.singleTask
    }
}

const mapDispatchtoProps = {
    singelTaskGet,
    delTask,
    SingleTaskEdit
}


SingleTask.propTypes = {
    singleTask: PropTypes.object.isRequired,
    singelTaskGet: PropTypes.func.isRequired,
    delTask: PropTypes.func.isRequired,
}




export default connect(mapStateToProps, mapDispatchtoProps)(SingleTask);