import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {SectionsContainer, Section, Header, Footer} from 'react-fullpage';

import LaunchBodyFirst from '../containers/launch/launch-body-first';
import LaunchHeader from '../containers/launch/launch-header';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { launchUpdatePageState, launchUpdateLinkState } from '../actions/index';

let options = {
    sectionClassName:     'section',
    anchors:              ['sectionOne', 'sectionTwo', 'sectionThree'],
    scrollBar:            false,
    navigation:           false,
    verticalAlign:        false,
    sectionPaddingTop:    '0px',
    sectionPaddingBottom: '0px',
    arrowNavigation:      true
};

class Launch extends Component {

    static contextTypes = {
        router:PropTypes.object
    };


    constructor(props) {
        super(props);

        this.props.launchUpdatePageState(0);
        this.props.launchUpdateLinkState(0);

    }

    shouldComponentUpdate(nextProps){
/*hello*/
        switch (nextProps.location.hash){
            case '#sectionOne':
                this.props.launchUpdatePageState(0);
                break;
            case '#sectionTwo':
                this.props.launchUpdatePageState(1);
                break;
            case '#sectionThree':
                this.props.launchUpdatePageState(2);
                break;
        }
        return true;
    }



    render() {
        return (
            <div>
                <LaunchHeader />
                <SectionsContainer {...options}>
                    <Section className="custom-section" verticalAlign="true" color="#69D2E7">
                        <LaunchBodyFirst />
                    </Section>
                    <Section color="#A7DBD8">Page 2</Section>
                    <Section color="#E0E4CC">Page 3</Section>
                </SectionsContainer>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {pageState:state.launch.pageState, linkState:state.launch.linkState};
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ launchUpdatePageState, launchUpdateLinkState }, dispatch);
}




export default connect(mapStateToProps, mapDispatchToProps)(Launch);
