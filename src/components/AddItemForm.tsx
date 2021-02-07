import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox, ControlPoint} from "@material-ui/icons";
import {RequestStatusType} from "../state/ app-reducer";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    entityStatus?:RequestStatusType
    disabled?:boolean
}

export const  AddItemForm = React.memo ((props: AddItemFormPropsType)=> {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addTask();
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('');
        } else {
            setError('Title is required')
        }
    }
    return <div>
        <TextField variant={'outlined'}
                   label={'Type value'}
                   value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
                   disabled={props.entityStatus==="loading"}
        />
        <IconButton onClick={addTask} disabled={props.entityStatus==="loading"} color="primary">
            <AddBox/>
        </IconButton>

    </div>
});