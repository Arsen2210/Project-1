import * as actionTypes from '../actionTypes'
import { request } from '../../Tools/request'


export default function delTask(taskId){
    return (dispatch) => {
        dispatch({type: actionTypes.DEL_TASK_REQUEST});
        request.delete(`/tasks/${taskId}`)
        .then(response => {
            if(response.error){
                throw response.error;
            }
            dispatch({ type: actionTypes.DEL_TASK_SUCCESS, taskId: taskId,response }) 
        })
        .catch(error => {
            dispatch({type: actionTypes.DEL_TASK_FAILURE, error: error.toString()});
        });
    }
}