import * as actionTypes from '../actionTypes'
import { request } from '../../Tools/request'


export default function contact(data){
    return (dispatch) => {
        dispatch({type: actionTypes.CONTACT_REQUEST});
        request.post(`/contact`,data)
        .then(response => {
            if(response.error){
                throw response.error;
            }
            dispatch({ type: actionTypes.CONTACT_SUCCESS, data:response}) 
        })
        .catch(error => {
            dispatch({type: actionTypes.CONTACT_FAILURE, error: error.toString()});
        });
    }
}