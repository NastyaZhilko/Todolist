import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button, Checkbox} from "@material-ui/core";
import {CheckBox, Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle:string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle:string, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle:string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    const onAllClickHandler = () => props.changeFilter('All', props.id)
    const onActiveClickHandler = () => props.changeFilter('Active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('Completed', props.id)
    const addTask = (title: string) => {
        props.addTask(title, props.id)
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
                    props.tasks.map(t => {
                        const onRemoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);

                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(t.id, newValue, props.id);

                        }
                        return <div key={t.id} className={t.isDone ? 'is-done' : ""}>
                            <Checkbox
                                   onChange={onChangeStatusHandler}
                                   checked={t.isDone}/>

                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>

                            <IconButton onClick={onRemoveHandler}>
                                <Delete/>
                            </IconButton>
                        </div>
                    })
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
    )}


