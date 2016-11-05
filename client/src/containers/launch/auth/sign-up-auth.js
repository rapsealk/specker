import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { signUpAuth } from '../../../actions/index';

class SignUpAuth extends Component{
    componentDidMount(){
        this.props.signUpAuth(this.props.location.query.token);
        console.log(this);

    }
    render(){
        return(
          <h2>인증중입니다...</h2>
        );
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({ signUpAuth }, dispatch);
}




export default connect(null, mapDispatchToProps)(SignUpAuth);