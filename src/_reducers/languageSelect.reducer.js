import { languageSelectConstants } from '../_constants';

export function languageSelect(state = {}, action) {
  switch (action.type) {
    case languageSelectConstants.CHANGE_LANGUAGE:
      return {
        language: action.newLanguage
      };
    default:
      return state
  }
}