import { navbarConstants } from '../_constants';
import { apiService } from '../_services';
import { notificationActions } from '.';
import { history } from '../_helpers';
import {appLogger} from '../_helpers/logger'
export const navbarActions = {
    logout,
    fetchCurrent
};

function fetchCurrent() {
    return dispatch => {
        dispatch(request());
        apiService.fetchCurrent()
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    apiService.logout();
                    history.push('/login');
                    appLogger(error.toString())
                    dispatch(failure(error.toString()));
                    dispatch(notificationActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: navbarConstants.FETCH_CURRENT_REQUEST } }
    function success(user) { return { type: navbarConstants.FETCH_CURRENT_SUCCESS, user } }
    function failure(error) { return { type: navbarConstants.FETCH_CURRENT_FAILURE, error } }
}

function logout() {
    apiService.logout();
    history.push('/login');
    return { type: navbarConstants.LOGOUT };
}
