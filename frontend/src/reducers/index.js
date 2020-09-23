import  authReducer  from './auth';
import userReducer from './user';
import { combineReducers } from 'redux';
import  restaurantReducer  from './restaurant';


const rootReducer = combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    user: userReducer
});

export default rootReducer;