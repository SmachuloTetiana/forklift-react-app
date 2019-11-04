import { combineReducers } from 'redux';
import counterReducer from './counter';
import authReducer from './authReducer';

const allReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer
})

export default allReducer;