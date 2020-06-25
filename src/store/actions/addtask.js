import * as actionTypes from '../actionTypes'

export default function addTask(taskData){
    return (dispatch) => {
        dispatch({type: actionTypes.ADD_TASK_REQUEST});
        fetch('http://localhost:3001/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                if(response.error){
                    throw response.error;
                }
                dispatch({ type: actionTypes.ADD_TASK_SUCCESS, taskData: taskData }) 
            })
            .catch(error => {
                dispatch({type: actionTypes.ADD_TASK_FAILURE, error: error.toString()});
            });
        }
}
