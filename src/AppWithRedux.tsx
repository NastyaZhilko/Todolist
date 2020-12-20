import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import Toolbar from '@material-ui/core/Toolbar';
import {AppBar, Button, Container, Grid, IconButton, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValueType = 'All' | 'Active' | 'Completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    //ф-ия диспатч(используем кух useDispatch из библиотеки React)
    const dispatch = useDispatch();
    //фия селектор (
    const todolists=useSelector<AppRootState, Array<TodolistType>>(state=>state.todolists)
    const tasks=useSelector<AppRootState, TasksStateType>(state=>state.tasks)


//функции для тасок ниже:
    //ф-ия удаления таски
    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(id, todolistId))

    }

    //ф-ия добавления таски
    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(title, todolistId))

    }

    //ф-ия изменения статуса таски
    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }

    //ф-ия изменения названия таски
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }

//функции для тудулистов ниже
    //ф-ия фильтрация тасок в тудулисте
    function changeFilter(value: FilterValueType, todolistId: string) {
        dispatch(changeTodolistFilterAC(value, todolistId))

    }

    //ф-ия удаления тудулиста
    let removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))

    }
    //ф-ия изменения названия тудулиста
    let changeTodolistTitle = (id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }

    //ф-ия добавления тудулиста
    function addTodolist(title: string) {
        dispatch(addTodolistAC(title))
    }

    return (
        <div className="App">
            <AppBar position="static">

                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasks[tl.id];

                            if (tl.filter === 'Active') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                            }
                            if (tl.filter === 'Completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
