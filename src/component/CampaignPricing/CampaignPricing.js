import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'src/component/CampaignPricing/CampaignPricing.scss';
import {setSelectedCampaign} from 'src/store/action/campaignAction';

class CampaignPricing extends Component {

    render() {
        return (
            <div id="myModal" className="modal">

                <div className="modal-content">
                    <div className="compain-heading">
                        <div><img src={process.env.PUBLIC_URL + '/' +  this.props.selectedCampaign.image_url}
                                  alt={this.props.selectedCampaign.name}/></div>
                        <div>
                            <p>{this.props.selectedCampaign.name}</p>
                            <small>{this.props.selectedCampaign.region}</small>
                        </div>
                    </div>
                    <h1>{this.props.translation.pricing}</h1>
                    {
                        this.props.selectedCampaign.price.map( (price, index) => (
                            <div className="pricing" key={index}>
                                <div>{price.label}</div>
                                <div>{price.value}</div>
                            </div>
                        ))
                    }
                    <div align="center">
                        <button type="button" className="btn" onClick={this.props.setSelectedCampaignToNull}>
                            {this.props.translation.close}
                        </button>
                    </div>
                </div>

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
        setSelectedCampaignToNull: () => dispatch(setSelectedCampaign(null))
    };
}

export default connect(mapPropsToDispatch, mapActionToDispatch)(CampaignPricing);