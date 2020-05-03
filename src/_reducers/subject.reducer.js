import { subjectConstants } from '../_constants';

export function subjects(state = {}, action) {
  switch (action.type) {
    case subjectConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case subjectConstants.GETALL_SUCCESS:
      return {
        items: action.subjects
      };
    case subjectConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}