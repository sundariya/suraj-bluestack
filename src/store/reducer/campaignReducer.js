import {GET_CAMPAIGN_LIST, SET_SELECTED_CAMPAIGN, UPDATE_CAMPAIGN_TYPE, CAMPAIGN_TYPE} from "src/store/actionConstant";

const initialState = {
    campaignList: [],
    campaignType: CAMPAIGN_TYPE.UPCOMING,
    selectedCampaign: null,
    campaignLSData: JSON.parse(localStorage.getItem('campaignList'))
};

const campaignReducer = (state = initialState, action) => {
    const newState = {...state};

    switch (action.type) {
        case GET_CAMPAIGN_LIST:
            return {
                ...state,
                campaignList: action.payload.campaignList

            }

        case UPDATE_CAMPAIGN_TYPE:
            return {
                ...state,
                campaignType: action.payload
            }

        case SET_SELECTED_CAMPAIGN:
            return {
                ...state,
                selectedCampaign: action.payload
            }

        default:
            return newState;
    }
}

export default campaignReducer;