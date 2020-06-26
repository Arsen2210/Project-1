import React, {useEffect} from 'react';
import classes from './style.module.css';
import {formatDate} from '../../../Tools/Tools';
import { Button, Card, } from 'react-bootstrap';
import {connect} from 'react-redux';
import singelTaskGet from '../../../store/actions/singletask';
import delTask from '../../../store/actions/deletetask';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrashAlt, faEdit} from '@fortawesome/free-solid-svg-icons';
// import {formatDate} from '../../../Tools/Tools';

function SingleTask(props){
    
    useEffect(()=>{
        const taskId=props.match.params.id;
        props.singelTaskGet(taskId)
    }, []);


    const deleteTask = () => {
        const taskId = props.match.params.id;
        props.delTask(taskId)
        props.history.push('/')
    };
    const { singleTask } =props;
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
                        onClick={deleteTask}
                        disabled={!singleTask}
                    >
                        Delete task
                </Button>
                </>

             }
            </>
        );
    }
const mapStateToProps=(state)=>{
    return{
        singleTask:state.singleTask
    }
}

const mapDispatchtoProps={
    singelTaskGet,
    delTask
}



export default connect(mapStateToProps,mapDispatchtoProps)(SingleTask);