import React, {Component} from 'react';
import {connect} from "react-redux";
import {setSelectedCampaign, scheduleAgain} from 'src/store/action/campaignAction';

import 'src/component/CampaignDetail/CampaignDetail.scss';
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class CampaignDetail extends Component{

    state = {
        startDate: new Date()
    };

    handleChange = date => {
        this.props.scheduleAgain(this.props.campaignDetail.id, date);
    };

    render() {
        const ExampleCustomInput = ({ onClick }) => (
            <button onClick={onClick}>
                <a href>
                    <img src={process.env.PUBLIC_URL + '/calendar.png'} className="img" alt={this.props.campaignDetail.name} />
                    <span>{this.props.translation.schedule_again}</span>

                </a>
            </button>
        );
        return (
            <div className="list-row">
                <div></div>
                <div className="list-data">
                    <div>
                        <p>{moment(this.props.campaignDetail.createdOn).format('MMM YYYY, DD')}</p>
                        <small>{moment(this.props.campaignDetail.createdOn).fromNow()}</small>
                    </div>
                    <div className="campaign-name">
                        <div><img src={process.env.PUBLIC_URL +'/' + this.props.campaignDetail.image_url} alt={this.props.campaignDetail.name} /></div>
                        <div>
                            <p>{this.props.campaignDetail.name}</p>
                            <p><small>{this.props.campaignDetail.region}</small></p>
                        </div>


                    </div>
                    <div>
                        <a href onClick={() => this.props.setSelectedCampaign(this.props.campaignDetail)}>
                            <img src={process.env.PUBLIC_URL + '/price.png'} className="img" alt={this.props.campaignDetail.name}/>
                            <span>{this.props.translation.view_price} </span>
                        </a>
                    </div>
                    <div>
                        <a href>
                            <img src={process.env.PUBLIC_URL + '/file.png'} className="img" alt={this.props.campaignDetail.name} />
                            <span>{this.props.translation.CSV}</span>
                        </a>
                        <a href>
                            <img src={process.env.PUBLIC_URL + '/statistics-report.png'} className="img" alt={this.props.campaignDetail.name} />
                            <span>{this.props.translation.report}</span>
                        </a>
                        {/*<a href>*/}
                        {/*    <img src={process.env.PUBLIC_URL + '/calendar.png'} className="img" alt={this.props.campaignDetail.name} />*/}
                        {/*    <span>{this.props.translation.schedule_again}</span>*/}

                        {/*</a>*/}
                        <DatePicker
                            onChange={this.handleChange}
                            customInput={<ExampleCustomInput />}
                        />

                    </div>
                </div>
                <div></div>

            </div>
        );
    }
}

const mapPropsToDispatch = (state) => {
    return {
        translation: state.localizationReducer.translation
    }
}

const mapActionToDispatch = (dispatch) => {
    return {
        setSelectedCampaign: (campaignDetail) => dispatch(setSelectedCampaign(campaignDetail)),
        scheduleAgain: (id, date) => dispatch(scheduleAgain(id, date))
    }
}

export default connect(mapPropsToDispatch, mapActionToDispatch)(CampaignDetail);