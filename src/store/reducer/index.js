import {combineReducers} from "redux";
import campaignReducer from "src/store/reducer/campaignReducer";
import localizationReducer from "src/store/reducer/localizationReducer";

const rootReducer = combineReducers({
    campaignReducer: campaignReducer,
    localizationReducer: localizationReducer
});

export default rootReducer;