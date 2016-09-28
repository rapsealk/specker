import React, { Component } from 'react';
// import Menu from 'react-burger-menu';
var Menu = require('react-burger-menu').slide;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeSidebarState } from '../../actions/index';

class IndexSidebar extends Component{


    showSettings(event){
        event.preventDefault();

    }
    isMenuOpen(state){
        this.props.changeSidebarState(state.isOpen);

    }
    render(){
        // const Menu = Menu['slide'];
        return(
            <div id="outer-container">
                <Menu width={ 450 } onStateChange={ this.isMenuOpen.bind(this) } right pageWrapId={ "page-wrap" } customBurgerIcon={ false }  isOpen={this.props.sidebarState ? true : false} customCrossIcon={ false } outerContainerId={ "outer-container" }>
                    <div className="chatMenu col-xs-2">
                        hello
                    </div>
                    <div className="chatContent col-xs-10">hello</div>
                </Menu>

            </div>


        );
    }
}

function mapStateToProps(state){
    return { sidebarState: state.index.sidebarState };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ changeSidebarState }, dispatch);
}




export default connect(mapStateToProps, mapDispatchToProps)(IndexSidebar);

