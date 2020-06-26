import * as actionTypes from './actionTypes'


const defaultState = {
    tasks: [],
    singleTask: {},
    loading: false,
    error: null,
    success: null,
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
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
            return {
                ...state,
                loading: false,
                tasks: [...state.tasks, action.taskData],
                success: "Task added successfully",

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
                loading: false,
                tasks: tasks,
                success: "Task edited successfully"
            };
        case actionTypes.EDIT_TASKS_REQUEST:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.DEL_TASK_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.DEL_TASK_SUCCESS:
            const newTasks = [...state.tasks].filter(({ id }) => action.taskId !== id);
            return {
                ...state,
                loading: false,
                tasks: newTasks,
                success: "Task deleted successfully"
            };
        case actionTypes.DEL_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.DEL_BULK_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.DEL_BULK_SUCCESS:
            const taskIds = action.tasksIds
            let newTasksArray = [...state.tasks];
            taskIds.forEach(id => { newTasksArray = newTasksArray.filter(task => task.id !== id) });
            return {
                ...state,
                loading: false,
                tasks: newTasksArray,
                success: "Task deleted successfully"
            };
        case actionTypes.DEL_BULK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.CONTACT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.CONTACT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: "Thank you for contacting us!!"
            };
        case actionTypes.CONTACT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.SINGLETASK_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.SINGLETASK_SUCCESS:
            return {
                ...state,
                loading: false,
                singleTask: action.task
            };
        case actionTypes.SINGLETASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.SEARCH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionTypes.SEARCH_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks:action.tasks
            };
        case actionTypes.SEARCH_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }


        default: return state;
    }
}