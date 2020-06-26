import * as actionTypes from '../actionTypes';
import {request} from '../../Tools/request';

export default function singleTaskGet(taskId){
    return (dispatch)=>{
        dispatch({type: actionTypes.SINGLETASK_REQUEST});
        request.get(`/tasks/${taskId}`)
        .then(response => {
            if(response.error){
                throw response.error;
            }
            dispatch({type: actionTypes.SINGLETASK_SUCCESS, task: response});
        })
        .catch(error=>{
            dispatch({type: actionTypes.SINGLETASK_FAILURE, error: error.toString()});
        });
    }

}