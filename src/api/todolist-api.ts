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
type CommonResponseType<T={}>={
    resultCode: number
    messages: Array<string>
    fieldsErrors:Array<string>
    data: T
}

export enum TaskStatuses{
    New=0,
    InProgress=1,
    Completed=2,
    Draft=3
}

export enum TaskPriorities{
    Low=0,
    Middle=1,
    Mi=2,
    Urgently=3,
    Later=4
}

export type TaskType={
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
export type UpdateTaskType={
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
type GetTasksResponse={
    totalCount:number
    error:string|null
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
    getTasks(todolistId: string){
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    postTask(todolistId: string, taskTitle: string) {
        return instance.post<CommonResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title:taskTitle})
    },
    updateTaskTitle(todolistId: string, taskId: string,  model: UpdateTaskType) {
        return instance.put<CommonResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}