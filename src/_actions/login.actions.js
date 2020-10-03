import { loginConstants,navbarConstants } from '../_constants';
import { apiService } from '../_services';
import { notificationActions } from '.';
import { history } from '../_helpers';
import {appLogger} from '../_helpers/logger'

export const loginActions = {
    login,
};

function login(username, password) {
    return dispatch => {
        dispatch(request());
        apiService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    dispatch({type: navbarConstants.FETCH_CURRENT_SUCCESS, user })
                    history.push('/dashboard/overview');
                },
                error => {
                    appLogger(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(notificationActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: loginConstants.LOGIN_REQUEST } }
    function success(user) { return { type: loginConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } }
}