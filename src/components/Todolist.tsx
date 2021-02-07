import React, {useCallback, useEffect} from "react";

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {fetchTodolistsTC, FilterValueType, TodolistDomainType} from "../state/todolists-reducer";
import {fetchTasksTC} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RequestStatusType} from "../state/ app-reducer";
import {AppRootStateType} from "../state/store";


type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeTodolistTitle: (id: string, newTitle: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    entityStatus: RequestStatusType
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolist.id)
    }, [props.removeTodolist, props.todolist.id])
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [props.todolist.id, props.changeTodolistTitle])
    const onAllClickHandler = useCallback(() => props.changeFilter('All', props.todolist.id), [props.changeFilter, props.todolist.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('Active', props.todolist.id), [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('Completed', props.todolist.id), [props.changeFilter, props.todolist.id])

    let tasksForTodolist = props.tasks
    if (props.todolist.filter === 'Active') {
        tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New);
    }
    if (props.todolist.filter === 'Completed') {
        tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask} entityStatus={props.entityStatus}/>
            <div>
                {
                    tasksForTodolist.map(t =>
                        <Task
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                            removeTask={props.removeTask}
                            task={t}
                            todolistId={props.todolist.id}
                            key={t.id}
                        />)
                }
            </div>
            <div>
                <Button color={'inherit'} variant={props.todolist.filter === 'All' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}

                >All
                </Button>
                <Button color={'primary'} variant={props.todolist.filter === 'Active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}

                >Active
                </Button>
                <Button color={'secondary'} variant={props.todolist.filter === 'Completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}

                >Completed
                </Button>
            </div>
        </div>
    )
})

