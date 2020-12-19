import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskACType = {
    type: 'REMOVE-TASK'
    todolistId:string
    taskId:string
}
export type AddTaskACType = {
    type: 'ADD-TASK'
    title: string
    todolistId:string
}
export type ChangeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone:boolean
    todolistId:string
}
export type ChangeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title:string
    todolistId:string
}
export type ActionType =
    RemoveTaskACType| AddTaskACType | ChangeTaskStatusACType|ChangeTaskTitleACType|AddTodolistActionType| RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK': {
            const stateCopy={...state};
            const tasks=stateCopy[action.todolistId]
            const newTask={id: v1(), title:action.title, isDone: false}
            const newTasks=[newTask,...tasks]
            stateCopy[action.todolistId]=newTasks
            return stateCopy
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy={...state};
            let tasks=state[action.todolistId];
            let task=tasks.find(t=>t.id===action.taskId)
            if (task) {
                task.isDone= action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy={...state};
      let tasks=state[action.todolistId];
      let task=tasks.find(t=>t.id===action.taskId)
            if (task) {
                task.title= action.title
            }
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            return {...state,  [action.todolistId]:[]}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            throw new Error("I don't understand this action type")
    }
};

export const removeTaskAC = (todolistId: string, taskId:string):RemoveTaskACType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
};

export const addTaskAC = (title: string, todolistId:string): AddTaskACType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone:boolean, todolistId:string): ChangeTaskStatusACType => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}

export const  changeTaskTitleAC = (taskId: string, title:string, todolistId:string): ChangeTaskTitleACType => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}


