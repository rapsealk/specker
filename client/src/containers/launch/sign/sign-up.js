import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { signupUser } from '../../../actions/index';
import { connect } from 'react-redux';


import WizardFormFirstPage from './sign-up-first';
import WizardFormSecondPage from './sign-up-second';
import WizardFormThirdPage from './sign-up-finish';


class Signup extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.state = {
            page: 1
        }
    }
    nextPage() {
        this.setState({ page: this.state.page + 1 })
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }

    render() {
        const { onSubmit } = this.props;
        const { page } = this.state;
        if(this.props.isEmailing){
            return(
                <div>
                    {<WizardFormThirdPage />}
                </div>
            )
        }
        return (
            <div>
                {page === 1 && <WizardFormFirstPage  onSubmit={this.nextPage}/>}
                {page === 2 && <WizardFormSecondPage signupUser={this.props.signupUser} previousPage={this.previousPage} onSubmit={this.nextPage}/>}

            </div>
        )
    }
}

Signup.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

function mapStateToProps(state){
    return {isEmailing: state.auth.isEmailing};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ signupUser }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup);