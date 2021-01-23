import React, {useCallback} from "react";

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValueType} from "./state/todolists-reducer";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeTodolistTitle: (id: string, newTitle: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses,  todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    },[props.removeTodolist,props.id])
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle])
    const onAllClickHandler = useCallback(() => props.changeFilter('All', props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('Active', props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('Completed', props.id), [props.changeFilter, props.id])

    let tasksForTodolist = props.tasks
    if (props.filter === 'Active') {
        tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New);
    }
    if (props.filter === 'Completed') {
        tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.Completed);
    }


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForTodolist.map(t =>
                        <Task
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        task={t}
                        todolistId={props.id}
                        key={t.id}
                    />)
                }
            </div>
            <div>
                <Button color={'inherit'} variant={props.filter === 'All' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}

                >All
                </Button>
                <Button color={'primary'} variant={props.filter === 'Active' ? 'contained' : 'text'}
                        onClick={onActiveClickHandler}

                >Active
                </Button>
                <Button color={'secondary'} variant={props.filter === 'Completed' ? 'contained' : 'text'}
                        onClick={onCompletedClickHandler}

                >Completed
                </Button>
            </div>
        </div>
    )
})

