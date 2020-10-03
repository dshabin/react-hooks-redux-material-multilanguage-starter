import { authHeader } from '../_helpers';
import config from '../config/config'


export const apiService = {
    login,
    logout,
    register,
    fetchCurrent,
};

async function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };
    const res = await fetch(`${config.apiUrl}/api/auth/signin/`, requestOptions)
    const data = await res.json()
    if(data.error){
        return Promise.reject(data.error.message);
    }
    if(data.data){
        localStorage.setItem('user', JSON.stringify(data.data));
        return data.data
    }   
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

async function fetchCurrent() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    const res = await fetch(`${config.apiUrl}/api/auth/fetch-current/`, requestOptions)
    const data = await res.json()
    if(data.error){
        return Promise.reject(data.error.message);
    }
    if(data.data){
        localStorage.setItem('user', JSON.stringify(data.data));
        return data.data
    }   
}


async function register(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    const res = await fetch(`${config.apiUrl}/api/auth/signup/`, requestOptions)
    const data = await res.json()
    if(data.error){
        return Promise.reject(data.error.message);
    }
    if(data.data){
        return data.data
    }
}
