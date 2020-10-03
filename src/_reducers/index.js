import { combineReducers } from 'redux';
import { notification } from './notification.reducer';
import { languageSelect } from './languageSelect.reducer';
import { login } from './login.reducer';
import { signup } from './signup.reducer';
import { navbar } from './navbar.reducer';

const rootReducer = combineReducers({
  notification,
  languageSelect,
  login,
  signup,
  navbar
});

export default rootReducer;