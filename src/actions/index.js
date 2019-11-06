export const setCurrentUser = user => {
    return {
        type: 'LOGIN',
        payload: user
    }
}

export const setRegisterUser = resp => {
    return {
        type: 'SIGNUP',
        payload: resp
    }
}

export const getForklift = forklift => {
    return {
        type: 'FORKLIFTS',
        payload: forklift
    }
}