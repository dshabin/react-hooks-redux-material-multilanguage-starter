import { notificationConstants } from '../_constants';

export function notification(state = {}, action) {
  switch (action.type) {
    case notificationConstants.SUCCESS:
      return {
        type: 'success',
        message: action.message
      };
    case notificationConstants.ERROR:
      return {
        type: 'danger',
        message: action.message
      };
    case notificationConstants.CLEAR:
      return {};
    default:
      return state
  }
}