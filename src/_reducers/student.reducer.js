import { studentConstants } from '../_constants';

export function students(state = {}, action) {
  switch (action.type) {
    case studentConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case studentConstants.GETALL_SUCCESS:
      return {
        items: action.students
      };
    case studentConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}