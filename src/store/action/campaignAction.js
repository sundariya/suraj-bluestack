import {GET_CAMPAIGN_LIST, UPDATE_CAMPAIGN_TYPE, SET_SELECTED_CAMPAIGN, CAMPAIGN_TYPE} from "src/store/actionConstant";
import campaigns from 'src/store/campaign';

/*
    Return data based on campaign Type(Upcoming, live and past) and will trigger when user switch tabs
    Upcoming: In case of Upcoming, It will return all the record with createdOn date is greater than today date
    Live: In case of Live, It will return all the record with createdOn date is equal to today date
    Past: In case of Past, It will return all the record with createdOn date is less than today date
 */
const getCampaignListData = (campaignReducerData) => {
    const retObj = {
        campaignList: campaignReducerData.campaignLSData ? campaignReducerData.campaignLSData : campaigns.data
    }
    const todatDate = new Date();
    todatDate.setHours(0,0,0,0);
    switch (campaignReducerData.campaignType) {
        case CAMPAIGN_TYPE.UPCOMING:
            retObj.campaignList = retObj.campaignList.filter( campaign => {
                const campaignDate = new Date(campaign.createdOn);
                campaignDate.setHours(0,0, 0, 0);
                return todatDate < campaignDate;
            });
            break;

        case CAMPAIGN_TYPE.LIVE:
            retObj.campaignList = retObj.campaignList.filter( campaign => {
                const campaignDate = new Date(campaign.createdOn);
                campaignDate.setHours(0,0, 0, 0);
                return todatDate.toString() === campaignDate.toString();
            });
            break;

        case CAMPAIGN_TYPE.PAST:
            retObj.campaignList = retObj.campaignList.filter( campaign => {
                const campaignDate = new Date(campaign.createdOn);
                campaignDate.setHours(0,0, 0, 0);
                return todatDate > campaignDate;
            });
            break;
        default:
            return true;

    }
    return retObj;
}

/*
    Called first time when user reloads the browser
 */
export const getCampaignList = () => {
    return (dispatch, getState) => {
        if (!localStorage.getItem('campaignList')) {
            const dataToUpdateLocalStorage = [];
            for(let i=0; i<campaigns.data.length; i++) {
                const campaignObj = campaigns.data[i];
                dataToUpdateLocalStorage.push(campaignObj);
            }
            localStorage.setItem('campaignList', JSON.stringify(dataToUpdateLocalStorage));
        }
        const campaignReducerData = getState().campaignReducer;

        const campaignListObj = getCampaignListData(campaignReducerData);

        dispatch({type: GET_CAMPAIGN_LIST,
            payload: {campaignList: campaignListObj.campaignList}});
    }
}

/*
    Called when when user switch the tabs
 */
export const updateCampaignType = (campaignType) => {
    return (dispatch, getState) => {
        dispatch({type: UPDATE_CAMPAIGN_TYPE, payload: campaignType});
        const campaignReducerData = getState().campaignReducer;

        const campaignListObj = getCampaignListData(campaignReducerData);

        dispatch({type: GET_CAMPAIGN_LIST,
            payload: {campaignList: campaignListObj.campaignList}});
    }
}

/*
    Called when user re-schedule campaign using calander
 */
export const scheduleAgain = (id, date) => {
    return (dispatch, getState) => {
        const campaignReducerData = getState().campaignReducer;

        const dataToUpdateLocalStorage = campaignReducerData.campaignLSData ? campaignReducerData.campaignLSData : campaigns.data;
        for(let i=0; i<dataToUpdateLocalStorage.length; i++) {
            if (id === dataToUpdateLocalStorage[i].id) {
                dataToUpdateLocalStorage[i].createdOn = date;
            }
        }
        localStorage.setItem('campaignList', JSON.stringify(dataToUpdateLocalStorage));

        const campaignListObj = getCampaignListData(campaignReducerData);

        dispatch({type: GET_CAMPAIGN_LIST,
            payload: {campaignList: campaignListObj.campaignList}});
    }
}

/*
    Called when user click on View Price link to see pricing details
 */
export const setSelectedCampaign = (campaignDetail) => {
    return (dispatch) => {
        dispatch({type: SET_SELECTED_CAMPAIGN, payload: campaignDetail});
    }
}





