import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

//типизация приходит на основании анализа того, что возвращает функция rootReducer
export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);


// @ts-ignore
window.store = store;
