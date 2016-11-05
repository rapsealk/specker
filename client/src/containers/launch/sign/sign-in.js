import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import renderField from './render-field'
class SignIn extends Component {
    handleFormSubmit(value) {
        // console.log("yaho!",value);

        // Need to do something to log user in
        // console.log(email,password);
        console.log(value);
        this.props.signinUser( value.email, value.password );
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
        const { handleSubmit} = this.props;

        return (
            <div className="SignInBox">
                <div className="SignInLogo">Sign IN</div>
                        <div className="SignInLine"></div>
                <form className="SignInForm" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <Field name="email" type="email" className="SignInInput" component={renderField} label="이메일"/>
                    <Field name="password" type="password" className="SignInPass" component={renderField} label="비밀번호"/>
                {this.renderAlert()}
                <div className="SignInInput">
                <button type="submit" className="SignInSubmitButton">Sign in</button>
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
    form: 'signin'
}, mapStateToProps)(SignIn);
