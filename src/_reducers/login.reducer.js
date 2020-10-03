import { loginConstants } from '../_constants';
const initialState = {};

export function login(state = initialState, action) {
  switch (action.type) {
    case loginConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case loginConstants.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        user: action.user
      };
    case loginConstants.LOGIN_FAILURE:
      return {};
    default:
      return state
  }
}