import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Fullpage, Slide, TopNav, SideNav } from 'fullpage-react';

import LaunchBodyFirst from '../containers/launch/launch-body-first';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { launchUpdatePageState, launchUpdateLinkState } from '../actions/index';

let fullPageOptions = {
    // for mouse/wheel events
    // represents the level of force required to generate a slide change on non-mobile, 100 is default
    threshold: 100,
    scrollingSpeed:1700,
    // for touchStart/touchEnd/mobile scrolling
    // represents the level of force required to generate a slide change on mobile, 100 is default
    sensitivity: 100


};

let topNavOptions = {
    footer: false, //topNav can double as a footer if true
    align: 'left', //also supports center and right alignment

    //styles to apply to children
    activeStyles: {backgroundColor: 'white'},
    hoverStyles: {backgroundColor: 'yellow'},
    nonActiveStyles: {backgroundColor: 'transparent'}
};

// all children are spans by default, for stacked buttons,
// just wrap your nested components/buttons in divs
let sideNavOptions = {
    right: '2%', //left alignment is default
    top: '50%', //top is 50% by default

    //styles to apply to children
    activeStyles: {color: 'white'},
    hoverStyles: {color: 'yellow'},
    nonActiveStyles: {color: 'gray'}
};

class Launch extends Component {

    static contextTypes = {
        router:PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            hover: null,
            link:0
        };

        this.props.launchUpdatePageState(0);
        this.props.launchUpdateLinkState(0);

        this.updateActiveState = this.updateActiveState.bind(this);
    }

    updateActiveState(newActive) {
        this.props.launchUpdatePageState(newActive);
        // this.props.launchUpdateLinkState();
        this.setState({'active': newActive});

    }

    shouldComponentUpdate(nP, nS) {



        //ensure hoverStyles and activeStyles update
        return nS.active != this.state.active || nS.hover != this.state.hover;
    }

    onMouseOver(idx) {
        this.setState({'hover': idx});
    }

    onMouseOut(e) {
        this.setState({'hover': null});
    }

    compareStyles(component, idx) {
        return idx == this.state.active ? component.activeStyles : idx == this.state.hover ? component.hoverStyles : component.nonActiveStyles
    }


    signinBtnClicked(){
        this.props.launchUpdateLinkState(1);
        this.forceUpdate();
    }

    signupBtnClicked(){
        this.props.launchUpdateLinkState(2);
        this.forceUpdate();
    }

    loginBtnClicked(){
        this.context.router.push('/');
    }



    renderHeader(){
        if(this.props.pageState!=undefined) {
            if (this.props.pageState !== 0) {
                console.log("hellohello!", this.props.pageState);
                return (
                    <TopNav className="launch-header" {...topNavOptions}>
                        <a href="/" className="launch-header-logo col-lg-1 col-md-1 col-sm-1 col-xs-1">LOGO</a>
                        <a onMouseUp={this.signinBtnClicked.bind(this)}
                           className="launch-header-btn col-lg-offset-9 col-lg-1 col-md-offset-9 col-md-1 col-sm-offset-9 col-sm-1 col-xs-offset-7 col-xs-2"
                           ref={0}>로그인</a>
                        <a onMouseUp={this.signupBtnClicked.bind(this)} className="launch-header-btn col-lg-1 col-md-1 col-sm-1 col-xs-2" ref={0}>회원가입</a>
                    </TopNav>
                );

            }
            else {
                if (this.props.linkState == 0) {
                    return (
                        <TopNav className="launch-header" {...topNavOptions}>
                            <a href="/" className="launch-header-logo col-lg-1 col-md-1 col-sm-1 col-xs-1">LOGO</a>
                            <a></a>
                        </TopNav>

                    );
                }
                else if (this.props.linkState == 1) {
                    return (
                        <TopNav className="launch-header" {...topNavOptions}>
                            <a href="/" className="launch-header-logo col-lg-1 col-md-1 col-sm-1 col-xs-1">LOGO</a>
                            <a onMouseUp={this.signupBtnClicked.bind(this)}
                               className="launch-header-btn col-lg-offset-10 col-md-offset-10  col-sm-offset-10 col-xs-offset-9 col-lg-1 col-md-1 col-sm-1 col-xs-2"
                               ref={0}>회원가입</a>
                        </TopNav>
                    );
                }
                else {
                    return (
                        <TopNav className="launch-header" {...topNavOptions}>
                            <a href="/" className="launch-header-logo col-lg-1 col-md-1 col-sm-1 col-xs-1">LOGO</a>
                            <a onMouseUp={this.signinBtnClicked.bind(this)}
                               className="launch-header-btn col-lg-offset-9 col-lg-1 col-md-offset-9 col-md-1 col-sm-offset-9 col-sm-1 col-xs-offset-7 col-xs-2"
                               ref={0}>로그인</a>
                        </TopNav>
                    );
                }


            }
        }
        else{
            return (
                <TopNav className="launch-header" {...topNavOptions}>
                    <a href="/" className="launch-header-logo col-lg-1 col-md-1 col-sm-1 col-xs-1">LOGO</a>
                    <a></a>
                </TopNav>

            );
        }


}





    render() {
        let navCount = 3;
        let navArr = [];



        for (let i = 0; i < navCount; i++) {
            navArr.push(i);
        }

        return (
            <Fullpage active={this.updateActiveState} {...fullPageOptions}>
                {
                    this.renderHeader()
                }


                <Slide style={{backgroundColor: '#61DAFB'}}>
                    <LaunchBodyFirst />
                </Slide>
                <Slide style={{backgroundColor: '#2B2C28'}}>
                </Slide>
                <Slide style={{backgroundColor: '#EFCB68'}}></Slide>

                <SideNav {...sideNavOptions}>
                    {navArr.map((n, idx) => {
                        return <div key={idx} ref={idx} style={this.compareStyles(sideNavOptions, idx)}
                                    onMouseOver={() => this.onMouseOver(idx)} onMouseOut={() => this.onMouseOut(idx)}>&#x25CF;</div>
                    }, this)}
                </SideNav>

            </Fullpage>
        );
    }
}

function mapStateToProps(state){
    console.log(state);
    return {pageState:state.launch.pageState, linkState:state.launch.linkState};
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ launchUpdatePageState, launchUpdateLinkState }, dispatch);
}




export default connect(mapStateToProps, mapDispatchToProps)(Launch);
