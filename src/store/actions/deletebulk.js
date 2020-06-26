import * as actionTypes from '../actionTypes'
import { request } from '../../Tools/request'


export default function delBulk(tasksIds){
    return (dispatch) => {
        dispatch({type: actionTypes.DEL_BULK_REQUEST});
        request.delete(`/tasks`,{tasks:tasksIds})
        .then(response => {
            if(response.error){
                throw response.error;
            }
            dispatch({ type: actionTypes.DEL_BULK_SUCCESS, tasksIds: tasksIds,response}) 
        })
        .catch(error => {
            dispatch({type: actionTypes.DEL_BULK_FAILURE, error: error.toString()});
        });
    }
}