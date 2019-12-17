import { LOGIN, SIGNUP } from "store/constants/actionTypes";

const initialState = {
    currentUser: null,
    registerUser: null
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                currentUser: action.payload
            }  
        case SIGNUP:
            return {
                ...state,
                registerUser: action.payload
            }  
        default:
            return state;
    }
}

export default authReducer;