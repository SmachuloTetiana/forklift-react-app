import { combineReducers } from 'redux';
import authReducer from './authReducer';
import forkliftReducer from './forkliftReducer';

const allReducer = combineReducers({
    auth: authReducer,
    forklift: forkliftReducer
})

export default allReducer;