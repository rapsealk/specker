import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../../actions';

class SignIn extends Component {
    handleFormSubmit({ email, password }) {
        // Need to do something to log user in
        this.props.signinUser({ email, password });
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

    render() {
        const { handleSubmit, fields: { email, password }} = this.props;

        return (
            <div className="SignInBox">
                <div className="SignInLogo">Sign IN</div>
                        <div className="SignInLine"></div>
                <form className="SignInForm"onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="SignInInput">
                    <input {...email}  className="SignInEmail" placeholder="이메일" />
                </fieldset>
                <fieldset className="SignInInput">
                    <input {...password} className="SignInPass"  type="password"  placeholder="비밀번호"/>
                </fieldset>
                {this.renderAlert()}
                <div className="SignInInput">
                <button action="submit" className="SignInSubmitButton">Sign in</button>
                </div>
            </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signin',
    fields: ['email', 'password']
}, mapStateToProps, actions)(SignIn);
