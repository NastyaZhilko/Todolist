import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType} from "../state/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {appReducer} from "../state/ app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../state/login-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app:appReducer,
    auth: authReducer
});

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "All", entityStatus: 'idle', addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "All", entityStatus: 'loading', addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: 'todolistsId1', startDate: '',
                deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, description: '', completed: false
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed,
                todoListId: 'todolistsId1', startDate: '',
                deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, description: '', completed: false
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todoListId: 'todolistsId2', startDate: '',
                deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, description: '', completed: false
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed,
                todoListId: 'todolistsId2', startDate: '',
                deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, description: '', completed: false
            }
        ]
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: false
    },
    auth:{
        isLoggedIn: true
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn: any) => <Provider store={storyBookStore}>{storyFn()}</Provider>