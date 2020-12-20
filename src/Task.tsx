import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type  TaskPropsType = {
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo ((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId);

    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);

    },[props.task.id,props.changeTaskTitle,props.todolistId])
    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ""}>
        <Checkbox
            onChange={onChangeStatusHandler}
            checked={props.task.isDone}/>

        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>

        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>
})