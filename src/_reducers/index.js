import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { students } from './student.reducer';
import { subjects } from './subject.reducer';
import { historySearchs } from './historySearch.reducer';
const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  students,
  subjects,
  historySearchs
});

export default rootReducer;