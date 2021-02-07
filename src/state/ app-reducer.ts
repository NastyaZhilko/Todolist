import {Dispatch} from "redux";
import {authApi, ResultCodeStatuses} from "../api/todolist-api";
import {setIsLoggedInAC} from "./login-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null|string,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return{...state, isInitialized : action.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC=(status:RequestStatusType)=>({type: "APP/SET-STATUS", status}as const)
export type SetAppStatusActionType=ReturnType<typeof setAppStatusAC>
export const setAppErrorAC=(error:null|string)=>({type: "APP/SET-ERROR", error}as const)
export const setIsInitializedAC=(isInitialized:boolean)=>({type:'APP/SET-IS-INITIALIZED', isInitialized}as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authApi.me().then(res => {
        debugger
        if (res.data.resultCode === ResultCodeStatuses.Success) {
            dispatch(setIsLoggedInAC(true));
        } else { handleServerAppError(res.data, dispatch)
        }

    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(()=>{
            dispatch(setIsInitializedAC(true))
        })
}


export type SetAppErrorActionType=ReturnType<typeof setAppErrorAC>
export type SetIsInitializedActionType=ReturnType<typeof setIsInitializedAC>


type ActionsType = SetAppStatusActionType|SetAppErrorActionType|SetIsInitializedActionType