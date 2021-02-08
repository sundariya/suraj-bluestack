import {CHANGE_LANGUAGE} from "src/store/actionConstant";
import {data} from 'src/i18n';

const initialState = {
    translation: data.en
};

const localizationReducer = (state = initialState, action) => {
    const newState = {...state};

    switch (action.type) {
        case CHANGE_LANGUAGE:
            return {
                ...state,
                translation: data[action.payload]
            }

        default:
            return newState;
    }
}

export default localizationReducer;