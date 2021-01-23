import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import Toolbar from '@material-ui/core/Toolbar';
import {AppBar, Button, Container, Grid, IconButton, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValueType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolist-api";


function AppWithReducers() {

    let todolistsId1 = v1();
    let todolistsId2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todolistsId1, title: "What to learn", filter: 'All', addedDate: '', order: 0},
        {id: todolistsId2, title: "What to buy", filter: 'All', addedDate: '', order: 0}
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistsId1]: [
            {
                id: v1(), title: 'HTML', status: TaskStatuses.Completed,
                todoListId: todolistsId1, startDate: '',
                deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Later, description: '', completed: false
            },
            {
                id: v1(), title: 'CSS', status: TaskStatuses.Completed, todoListId: todolistsId1, startDate: '',
                deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Later, description: '', completed: false
            },
            {
                id: v1(), title: 'React', status: TaskStatuses.Completed, todoListId: todolistsId1, startDate: '',
                deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Later, description: '', completed: false
            }
        ],
        [todolistsId2]: [
            {
                id: v1(), title: 'Book', status: TaskStatuses.Completed, todoListId: todolistsId2, startDate: '',
                deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Later, description: '', completed: false
            },
            {
                id: v1(), title: 'Computer', status: TaskStatuses.Completed, todoListId: todolistsId2, startDate: '',
                deadline: '', addedDate: '', order: 0,
                priority: TaskPriorities.Later, description: '', completed: false
            }
        ]
    })

//функции для тасок ниже:
    //ф-ия удаления таски
    function removeTask(id: string, todolistId: string) {
        dispatchToTasksReducer(removeTaskAC(id, todolistId))

    }
    //ф-ия добавления таски
    function addTask(title: string, todolistId: string) {
        dispatchToTasksReducer(addTaskAC(title, todolistId))

    }
    //ф-ия изменения статуса таски
    function changeStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, status, todolistId))
    }
    //ф-ия изменения названия таски
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId))
    }
//функции для тудулистов ниже
    //ф-ия фильтрация тасок в тудулисте
    function changeFilter(value: FilterValueType, todolistId: string) {
        dispatchToTodolistsReducer(changeTodolistFilterAC(value,todolistId))

    }
    //ф-ия удаления тудулиста
    let removeTodolist = (todolistId: string) => {
        dispatchToTodolistsReducer(removeTodolistAC(todolistId))
        dispatchToTasksReducer(removeTodolistAC(todolistId))
    }
    //ф-ия изменения названия тудулиста
    let changeTodolistTitle = (id: string, newTitle: string) => {
        dispatchToTodolistsReducer(changeTodolistTitleAC(id, newTitle))
    }

    //ф-ия добавления тудулиста
    function addTodolist(title: string) {
        dispatchToTodolistsReducer(addTodolistAC(title))
        dispatchToTasksReducer(addTodolistAC(title))
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
                            let tasksForTodolist = tasksObj[tl.id];

                            if (tl.filter === 'Active') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === 'Completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
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

export default AppWithReducers;
