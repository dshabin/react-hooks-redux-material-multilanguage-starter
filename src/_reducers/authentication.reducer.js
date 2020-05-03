import { authenticationConstants } from '../_constants';
const initialState = {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authenticationConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case authenticationConstants.LOGIN_SUCCESS:
      return {
        user: action.user
      };
    case authenticationConstants.LOGIN_FAILURE:
      return {};
    case authenticationConstants.FETCH_CURRENT_SUCCESS:
      return {
        user: action.user
      };
    case authenticationConstants.FETCH_CURRENT_REQUEST:
      return {
        fetchingCurrent: true,
      };
    case authenticationConstants.FETCH_CURRENT_FAILURE:
      return {};
    case authenticationConstants.LOGOUT:
      return {};
    case authenticationConstants.REGISTER_REQUEST:
      return { registering: true };
    case authenticationConstants.REGISTER_SUCCESS:
      return {};
    case authenticationConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}