import { authHeader } from '../_helpers';
import config from '../config/config'


export const userService = {
    login,
    logout,
    register,
    fetchCurrent,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/api/auth/signin/`, requestOptions)
        .then(handleResponse)
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data.data));
            return data.data
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function fetchCurrent() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/auth/fetch-current/`, requestOptions)
        .then(handleResponse)
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data.data));
            return data.data
        });
}


function register(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/api/auth/signup/`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (data.error) {
            return Promise.reject(data.error.message);
        }
        return data;
    });
}