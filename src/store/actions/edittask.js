import * as actionTypes from '../actionTypes'

export default function editTask(taskId,taskData){
    return (dispatch) => {
        dispatch({type: actionTypes.EDIT_TASKS_REQUEST});
        fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify(taskData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            if(response.error){
                throw response.error;
            }
            dispatch({ type: actionTypes.EDIT_TASK_SUCCESS, taskData: response }) 
        })
        .catch(error => {
            dispatch({type: actionTypes.EDIT_TASK_FAILURE, error: error.toString()});
        });
    }
}