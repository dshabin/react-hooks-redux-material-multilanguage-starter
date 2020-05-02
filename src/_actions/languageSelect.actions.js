import { languageSelectConstants } from '../_constants';

export const languageSelectActions = {
    changeLanguage,
};

function changeLanguage(newLanguage) {
    return { type: languageSelectConstants.CHANGE_LANGUAGE, newLanguage };
}