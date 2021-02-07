import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../api/todolist-api";

export type  TaskPropsType = {
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo ((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue=e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId);

    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);

    },[props.task.id,props.changeTaskTitle,props.todolistId])
    return <div key={props.task.id} className={props.task.status===TaskStatuses.Completed ? 'is-done' : ""}>
        <Checkbox
            onChange={onChangeStatusHandler}
            color='primary'
            checked={props.task.status===TaskStatuses.Completed}/>

        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>

        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
})