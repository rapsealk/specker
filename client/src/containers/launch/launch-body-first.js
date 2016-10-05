import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { launchUpdateLinkState, launchUpdatePageState } from '../../actions/index'
import SignIn from './auth/signin';
import SignUp from './auth/signup';
import {Section} from 'react-fullpage';

import WizardForm from './WizardForm';
import Launch_body_border from './launch-body-border';

class LaunchBodyFirst extends Component{

    signinFormSubmit({ email, password }) {
        // Need to do something to log user in
        this.props.signinUser({ email, password });
    }

    signupFormSubmit(formProps) {
        // Call action creator to sign up the user!
        this.props.signupUser(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (

                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    signinBtnClicked(){
        this.props.launchUpdateLinkState(1);
    }
    signupBtnClicked(){

        this.props.launchUpdateLinkState(2);
    }

    render(){
        if(this.props.linkState==1){
            return(


                    <SignIn />

            );
        }

        else if(this.props.linkState==2){
            return(

                        <SignUp />
            );
        }

        return(
            // <div className="launch-body-title">
            // </div>
            <Section>
            <div className="vertical-center">
                <div className="launch-body-title row">

                    <div className="launch-body-first-letter">SPECKER</div>
                    <div className="launch-body-second-letter">SPEC-UP-TOGETHER</div>
                </div>
                <div className="launch-body-content row">
                        <button className="SignInButton" onClick={this.signinBtnClicked.bind(this)}>Sign In</button>
                        <button className="SignUpButton" onClick={this.signupBtnClicked.bind(this)}>Sign Up</button>
                </div>
            </div>
            </Section>
        );


    }
}


function mapStateToProps(state){
    return {pageState:state.launch.pageState, linkState:state.launch.linkState};
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ launchUpdatePageState, launchUpdateLinkState }, dispatch);
}




export default connect(mapStateToProps, mapDispatchToProps)(LaunchBodyFirst);