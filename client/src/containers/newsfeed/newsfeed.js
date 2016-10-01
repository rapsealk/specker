import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { launchUpdateLinkState, launchUpdatePageState } from '../../actions/index'

import NewsfeedBody from './newsfeed-body';

class Newsfeed extends Component{
    render(){
        return(
            <div>
                <NewsfeedBody />
            </div>
        )
    }
}



export default Newsfeed;
// export default connect(mapStateToProps, mapDispatchToProps)(LaunchBodyFirst);