import { LOGIN, SIGNUP, PRODUCTS } from "../constants/actionTypes"

export const setCurrentUser = user => {
    return {
        type: LOGIN,
        payload: user
    }
}

export const setRegisterUser = resp => {
    return {
        type: SIGNUP,
        payload: resp
    }
}

export const setItems = response => {
    return {
        type: PRODUCTS,
        payload: response
    }
}