import { signupConstants } from '../_constants';
import { apiService } from '../_services';
import { notificationActions } from '.';
import { history } from '../_helpers';
export const signupActions = {
    register,
};

function register(username,password) {
    return dispatch => {
        dispatch(request());

        apiService.register(username, password)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(notificationActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(notificationActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: signupConstants.REGISTER_REQUEST } }
    function success(user) { return { type: signupConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: signupConstants.REGISTER_FAILURE, error } }
}
