import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import Toolbar from "@material-ui/core/Toolbar";
import {Menu} from "@material-ui/icons";
import {initializeAppTC, RequestStatusType} from "./state/ app-reducer";
import {ErrorSnackbar} from "./components/ErrorSnackbar";
import {TodolistsList} from "./components/Todolists";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from './login/Login';


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state: AppRootStateType) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state: AppRootStateType) => state.app.isInitialized)

    const dispatch = useDispatch();

    useEffect(() => {dispatch(initializeAppTC())}, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
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
                {status === "loading" && <LinearProgress color="secondary"/>}
                <Container fixed>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>

                </Container>
            </div>
        </BrowserRouter>
    )
}

export default App;

