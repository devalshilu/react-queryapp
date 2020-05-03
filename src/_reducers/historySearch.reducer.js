import { historySearchConstants } from '../_constants';

export function historySearchs(state = {}, action) {
  switch (action.type) {
    case historySearchConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case historySearchConstants.GETALL_SUCCESS:
      return {
        items: action.historySearchs
      };
    case historySearchConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}