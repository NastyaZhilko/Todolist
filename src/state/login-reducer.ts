import {setAppStatusAC, SetAppStatusActionType} from "./ app-reducer";
import {authApi, LoginParamsType, ResultCodeStatuses} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {Dispatch} from "redux";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState



export const authReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) => ({
    type: 'login/SET-IS-LOGGED-IN',
    value
} as const)


export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(data)
        .then((res) => {
            if (res.data.resultCode === ResultCodeStatuses.Success) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export type ActionType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppStatusActionType



