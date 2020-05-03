import { studentConstants, subjectConstants } from '../_constants';
import { studentService } from '../_services';

export const studentActions = {
    getAllSubject,
    runQuery
};

function getAllSubject() {
    return dispatch => {
        dispatch(request());

        studentService.getAll()
            .then(
                subjects => dispatch(success(subjects)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: subjectConstants.GETALL_REQUEST } }
    function success(subjects) { return { type: subjectConstants.GETALL_SUCCESS, subjects } }
    function failure(error) { return { type: subjectConstants.GETALL_FAILURE, error } }
}
function runQuery(input) {
    return dispatch => {
        dispatch(request());

        studentService.runQuery(input)
            .then(
                students => dispatch(success(students)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: studentConstants.GETALL_REQUEST } }
    function success(students) { return { type: studentConstants.GETALL_SUCCESS, students } }
    function failure(error) { return { type: studentConstants.GETALL_FAILURE, error } }
}