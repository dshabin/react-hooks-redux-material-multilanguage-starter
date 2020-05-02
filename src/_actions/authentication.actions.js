import { authenticationConstants } from '../_constants';
import { userService } from '../_services';
import { notificationActions } from '.';
import { history } from '../_helpers';
import {appLogger} from '../_helpers/logger'
export const userActions = {
    login,
    logout,
    register,
    fetchCurrent
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/dashboard');
                },
                error => {
                    appLogger(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(notificationActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: authenticationConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: authenticationConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authenticationConstants.LOGIN_FAILURE, error } }
}

function fetchCurrent() {
    return dispatch => {
        dispatch(request({}));
        userService.fetchCurrent()
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    userService.logout();
                    history.push('/login');
                    appLogger(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(notificationActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: authenticationConstants.FETCH_CURRENT_REQUEST, user } }
    function success(user) { return { type: authenticationConstants.FETCH_CURRENT_SUCCESS, user } }
    function failure(error) { return { type: authenticationConstants.FETCH_CURRENT_FAILURE, error } }
}

function logout() {
    userService.logout();
    history.push('/login');

    return { type: authenticationConstants.LOGOUT };
}

function register(username,password) {
    return dispatch => {
        dispatch(request({username}));

        userService.register(username, password)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(notificationActions.success('REGISTRATION_SUCCESSFUL'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(notificationActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: authenticationConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: authenticationConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: authenticationConstants.REGISTER_FAILURE, error } }
}
