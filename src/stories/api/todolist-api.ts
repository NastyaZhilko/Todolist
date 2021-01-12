import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f86ed128-1eb6-4390-9695-099af06721b7'
    }
})

export type TodoType = {
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

export type TaskType={
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
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
        return instance.get<Array<TodoType>>('todo-lists')
    },
    postTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>('todo-lists', {title})
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