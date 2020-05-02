import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { notification } from './notification.reducer';
import { languageSelect } from './languageSelect.reducer';

const rootReducer = combineReducers({
  authentication,
  notification,
  languageSelect
});

export default rootReducer;