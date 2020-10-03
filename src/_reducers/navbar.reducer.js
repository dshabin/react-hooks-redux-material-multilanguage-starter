import { navbarConstants } from '../_constants';
const initialState = {};

export function navbar(state = initialState, action) {
    switch (action.type) {
        case navbarConstants.FETCH_CURRENT_SUCCESS:
            return {
                user: action.user
            };
        case navbarConstants.FETCH_CURRENT_REQUEST:
            return {
                fetchingCurrent: true,
            };
        case navbarConstants.FETCH_CURRENT_FAILURE:
            return {};
        case navbarConstants.LOGOUT:
            return {};
        default:
            return state
    }
}