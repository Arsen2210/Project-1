import * as actionTypes from '../actionTypes'
import { request } from '../../Tools/request'

export default function editTask(taskId,taskData){
    return (dispatch) => {
        dispatch({type: actionTypes.EDIT_SINGLETASKS_REQUEST});
        request.put(`/tasks/${taskId}`,taskData)
        .then(response => {
            if(response.error){
                throw response.error;
            }
            dispatch({ type: actionTypes.EDIT_SINGLETASK_SUCCESS, taskData: response }) 
        })
        .catch(error => {
            dispatch({type: actionTypes.EDIT_SINGLETASK_FAILURE, error: error.toString()});
        });
    }
}