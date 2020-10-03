import { signupConstants } from '../_constants';
const initialState = {};

export function signup(state = initialState, action) {
  switch (action.type) {
    case signupConstants.REGISTER_REQUEST:
      return { registering: true };
    case signupConstants.REGISTER_SUCCESS:
      return {};
    case signupConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}