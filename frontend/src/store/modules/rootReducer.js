import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import meetup from './meetup/reducer';
import file from './file/reducer';

export default combineReducers({
  auth,
  user,
  meetup,
  file,
});
