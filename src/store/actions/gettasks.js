import * as actionTypes from '../actionTypes';
import {request} from '../../Tools/request';

export default function getTasks(search = ''){
    return (dispatch)=>{
        dispatch({type: actionTypes.GET_TASKS_REQUEST});
        request.get(`/tasks${search}`)
        .then(response => {
            if(response.error){
                throw response.error;
            }
            dispatch({type: actionTypes.GET_TASKS_SUCCESS, data: response});
        })
        .catch(error=>{
            dispatch({type: actionTypes.GET_TASKS_FAILURE, error: error.toString()});
        });
    }

}