import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './forkliftReducer';

const allReducer = combineReducers({
    auth: authReducer,
    products: productReducer
})

export default allReducer;