const initialState = {
    items: null
}

const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'PRODUCTS':
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}

export default productReducer;