import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f86ed128-1eb6-4390-9695-099af06721b7'
    }
})

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

export enum ResultCodeStatuses {
    Success = 0,
    Error = 1,
    Captcha = 10
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Mi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    id: string
    title: string
    status: TaskStatuses
    todoListId: string
    startDate: string
    deadline: string
    addedDate: string
    order: number
    priority: TaskPriorities
    description: string
    completed: boolean
}
export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

type GetTasksResponse = {
    totalCount: number
    error: string | null
    items: Array<TaskType>
}

export const todoApi = {
    getTodos() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    postTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<CommonResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export type LoginParamsType={
    email:string
    password:string
    rememberMe:boolean
    captcha?:string
}

type MeResponseType={
    id:number
    email:string
    login:string
}
export const authApi={
    login(data:LoginParamsType){
        return instance.post<CommonResponseType<{ userId?: number }>>('auth/login', data)
    },
    me(){
        return instance.get<CommonResponseType<MeResponseType>>('auth/me')
    }
}