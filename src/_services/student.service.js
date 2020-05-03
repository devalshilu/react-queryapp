import config from 'config';
import { authHeader } from '../_helpers';

export const studentService = {
    getAll,
    runQuery
};

function runQuery(data) {
    console.log(data)
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body:  JSON.stringify(Array.from(data))
    };

    return fetch(`${config.apiUrl}/runQuery`, requestOptions)
        .then(handleResponse)
        .then(students => {
            return students;
        });
}
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/subject`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}