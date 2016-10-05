import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { launchUpdateLinkState, launchUpdatePageState } from '../../actions/index'
import SignIn from './auth/signin';
import SignUp from './auth/signup';
import {Section} from 'react-fullpage';

import WizardForm from './WizardForm';

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
                <Section>
            <div className="vertical-center">
                <div className="launch-body-title row">
                    hello
                </div>
                <div className="launch-body-content row">

                    <SignIn />
                </div>
            </div>
                </Section>
            );
        }

        else if(this.props.linkState==2){
            return(
                <Section>
                <div className="vertical-center">
                    <div className="launch-body-title row">

                    </div>
                    <div className="launch-body-content row">
                        <WizardForm />
                    </div>
                </div>
                </Section>
            );
        }

        return(
            // <div className="launch-body-title">
            // </div>
            <Section>
            <div className="vertical-center">
                <div className="launch-body-title row">
                    hello
                </div>
                <div className="launch-body-content row">
                    <div id="launch-body-btn-signup" onClick={this.signinBtnClicked.bind(this)} className="launch-body-btn col-sm-3 col-sm-offset-3 col-xs-offset-2 col-xs-8 btn btn-primary">
                        로그인
                    </div>
                    <div id="launch-body-btn-signin" onClick={this.signupBtnClicked.bind(this)} className="launch-body-btn col-sm-3 col-sm-offset-0 col-xs-offset-2 col-xs-8 btn btn-primary">
                        회원가입
                    </div>
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