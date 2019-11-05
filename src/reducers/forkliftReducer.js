const initialState = {
    item: null
}

const forkliftReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FORKLIFTS':
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}

export default forkliftReducer;