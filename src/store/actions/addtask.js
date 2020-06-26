import * as actionTypes from '../actionTypes'
import { request } from '../../Tools/request'

export default function addTask(taskData) {
    return (dispatch) => {
        dispatch({ type: actionTypes.ADD_TASK_REQUEST });
        request.post(`/tasks`,taskData)
            .then(response => {
                if(response.error){
                    throw response.error;
                }
                dispatch({ type: actionTypes.ADD_TASK_SUCCESS, taskData: response })
            })
            .catch(error => {
                dispatch({ type: actionTypes.ADD_TASK_FAILURE, error: error.toString() });
            });
    }
}
