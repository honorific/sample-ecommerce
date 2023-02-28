import { combineReducers } from 'redux';
import themeReducer from './slices/themeSlice';
import shopReducer from './slices/shopSlice';
import userReducer from './slices/userSlice';

const Reducers = combineReducers({
  themeState: themeReducer,
  shopState: shopReducer,
  userState: userReducer,
});

export default Reducers;
