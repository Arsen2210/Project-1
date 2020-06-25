import * as actionTypes from './actionTypes'

const defaultState = {
  tasks: [],
  loading: false,
  error: null,
  success: null,
 
 };
 
 export default function reducer(state = defaultState, action){
     switch(action.type){
         case actionTypes.GET_TASKS_REQUEST: 
         return {
             ...state,
             loading: true
         };
         case actionTypes.GET_TASKS_SUCCESS: 
         return {
             ...state,
             loading: false,
             tasks: action.data
         };
         case actionTypes.GET_TASKS_FAILURE: 
         return {
             ...state,
             loading: false,
             error: action.error
         }
         case actionTypes.ADD_TASK_SUCCESS:
         state.tasks.push(action.taskData)
         return {
             ...state,
             loading:false,
             tasks:state.tasks
         };
         case actionTypes.ADD_TASK_REQUEST: 
         return {
             ...state,
             loading: true
         };
         case actionTypes.ADD_TASK_FAILURE: 
         return {
             ...state,
             loading: false,
             error: action.error
         };
         case actionTypes.EDIT_TASK_FAILURE: 
         return {
             ...state,
             loading: false,
             error: action.error
         };
         case actionTypes.EDIT_TASK_SUCCESS: 
         const tasks = [...state.tasks];
         const taskIndex = tasks.findIndex(task => task.id === action.taskData.id);
         tasks[taskIndex] = action.taskData;
         return {
            ...state,
            loading:false,
            tasks:tasks
         };
         case actionTypes.EDIT_TASKS_REQUEST: 
         return {
             ...state,
             loading: false,
             error: action.error
         };
         default: return state;
     }
 
 
 }