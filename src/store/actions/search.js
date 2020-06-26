import * as actionTypes from '../actionTypes';
import {request} from '../../Tools/request';

export default function searchTasks(query){
    return (dispatch)=>{
        dispatch({type: actionTypes.SEARCH_REQUEST});
        request.get(`/tasks?${query}`)
        .then(response => {
            if(response.error){
                throw response.error;
            }
            console.log(response)
            dispatch({type: actionTypes.SEARCH_SUCCESS, tasks: response});
        })
        .catch(error=>{
            dispatch({type: actionTypes.SEARCH_FAILURE, error: error.toString()});
        });
    }

}