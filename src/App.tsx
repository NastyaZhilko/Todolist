import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import Toolbar from '@material-ui/core/Toolbar';
import {AppBar, Button, Container, Grid, IconButton, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValueType, TodolistDomainType} from "./state/todolists-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistsId1 = v1();
    let todolistsId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistsId1, title: "What to learn", filter: 'All', addedDate: '', order: 0},
        {id: todolistsId2, title: "What to buy", filter: 'All', addedDate: '', order: 0}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, status: TaskStatuses.New, todoListId: todolistId, startDate: '',
            deadline: '', addedDate: '', order: 0,
            priority: TaskPriorities.Later, description: '', completed: false}
        let todoListTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        let task = tasks[todolistId].find(t => t.id === id);
        if (task) {
            task.status = status;
            setTasks({...tasks});

        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let task = tasks[todolistId].find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks});

        }
    }

    function removeTask(id: string, todoListId: string) {
        let filteredTasks = tasks[todoListId].filter(t => t.id != id);
        tasks[todoListId] = filteredTasks
        setTasks({...tasks});
    }


    function changeFilter(value: FilterValueType, todoListId: string) {
        let todolist = todolists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])

        }
    }

    let removeTodolist = (todoListId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todoListId)
        setTodolists(filteredTodolist);
        delete tasks[todoListId];
        setTasks({...tasks})
    }

    let changeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === id)
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists])
        }
    }


    function addTodolist(title: string) {
        let todolist: TodolistDomainType = {
            id: v1(),
            filter: 'All',
            title: title,
            addedDate: '',
            order:0
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasks, [todolist.id]: []
        })
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
                                tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
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

export default App;
