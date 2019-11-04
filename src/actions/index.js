export const increment = number => {
    return {
        type: 'INCREMENT',
        payload: number
    }
};

export const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}

export const setCurrentUser = user => {
    return {
        type: 'LOGIN',
        payload: user
    }
}