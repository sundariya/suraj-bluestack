import React, {Component} from 'react';
import {connect} from "react-redux";
import 'src/component/CampaignList.scss';
import {getCampaignList, updateCampaignType} from "src/store/action/campaignAction";
import CampaignDetail from "src/component/CampaignDetail/CampaignDetail";
import CampaignPricing from "src/component/CampaignPricing/CampaignPricing";

class CampaignList extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.getCampaignList();
    }

    changeTab = (event) => {
        if (event.target.dataset.type) {
            this.props.updateCampaignType(event.target.dataset.type);
        }
    }

    render() {
        return (
            <div className="campaign-container">
                <div>
                    <div className="title">
                        <h1>{this.props.translation.manage_capaign}</h1>
                    </div>
                    <div className="tab-container" onClick={this.changeTab}>
                        <div className={`tab-item ' ${this.props.campaignType ===  'UPCOMING' ? 'active' :''}`}
                             data-type="UPCOMING">
                            <a href className={this.props.campaignType ===  'UPCOMING' ? 'active' :''} data-type="UPCOMING">
                                {this.props.translation.upcoming_capaign}
                            </a>
                        </div>
                        <div className={`tab-item ' ${this.props.campaignType ===  'LIVE' ? 'active' :''}`}
                             data-type="LIVE">
                            <a href className={this.props.campaignType ===  'LIVE' ? 'active' :''} data-type="LIVE">
                                {this.props.translation.live_capaign}
                            </a>
                        </div>
                        <div className={`tab-item ' ${this.props.campaignType ===  'PAST' ? 'active' :''}`}
                             data-type="PAST">
                            <a href className={this.props.campaignType ===  'PAST' ? 'active' :''} data-type="PAST">
                                {this.props.translation.past_capaign}
                            </a>
                        </div>
                    </div>
                    <div className="data-container">
                        <div className="list-caption">
                            <div>{this.props.translation.DATE}</div>
                            <div>{this.props.translation.CAMPAIGN}</div>
                            <div>{this.props.translation.VIEW}</div>
                            <div>{this.props.translation.ACTIONS}</div>
                        </div>
                        {
                            this.props.campaignList.map( (campaign, index) => (
                            <CampaignDetail campaignDetail = {campaign} key={index} />
                            ))
                        }
                        {
                            this.props.selectedCampaign ? (<CampaignPricing selectedCampaign={this.props.selectedCampaign}></CampaignPricing>) : ''
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapPropsToDispatch = (state) => {
    return {
        campaignList: state.campaignReducer.campaignList,
        campaignType: state.campaignReducer.campaignType,
        selectedCampaign: state.campaignReducer.selectedCampaign,
        translation: state.localizationReducer.translation
    }
}

const mapActionToDispatch = (dispatch) => {
    return {
        getCampaignList: () => dispatch(getCampaignList()),
        updateCampaignType: (campaignType) => dispatch(updateCampaignType(campaignType))
    }
}

export default connect(mapPropsToDispatch, mapActionToDispatch)(CampaignList);