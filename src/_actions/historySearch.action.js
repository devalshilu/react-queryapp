import { historySearchConstants } from '../_constants';
import { historySearchService } from '../_services';


export const historySearchActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch(request());

        historySearchService.getAll()
            .then(
                historySearchs => dispatch(success(historySearchs)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: historySearchConstants.GETALL_REQUEST } }
    function success(historySearchs) { return { type: historySearchConstants.GETALL_SUCCESS, historySearchs } }
    function failure(error) { return { type: historySearchConstants.GETALL_FAILURE, error } }
}