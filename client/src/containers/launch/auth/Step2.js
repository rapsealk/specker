import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import { sineupStep  } from '../../../actions/index'

class SignUp extends Component {


    handleFormSubmit(formProps) {
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

    render() {
        const { handleSubmit, fields: { name,   email, password, passwordConfirm }} = this.props;
        console.log(this.props.step);
        return (

            <div className="SignInBox">

                <form className="SignUp-Form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset className="SignUp-row-Box">
                        <label className="SignUp-Label">이름</label>
                        <br/>
                        <input {...name} className="SignUp-Input" />
                        {name.touched && name.error && <div className="error">{name.error}</div>}
                    </fieldset>
                    <fieldset className="SignUp-row-Box">
                        <label className="SignUp-Label">Email</label>
                        <br/>
                        <input {...email} className="SignUp-Input" />
                        {email.touched && email.error && <div className="error">{email.error}</div>}
                    </fieldset>
                    <fieldset className="SignUp-row-Box">
                        <label className="SignUp-Label">Password:</label>
                        <br/>
                        <input {...password} className="SignUp-Input" type="password" />
                        {password.touched && password.error && <div className="error">{password.error}</div>}
                    </fieldset>
                    <fieldset className="SignUp-row-Box">
                        <label className="SignUp-Label">Confirm Password:</label>
                        <br/>
                        <input  {...passwordConfirm}  className="SignUp-Input" type="password" />
                        {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                    </fieldset>
                    {this.renderAlert()}
                    <button action="submit" className="btn btn-primary">Sign up!</button>
                </form>

            </div>
        );
    }
}


function validate(formProps) {
    const errors = {};

    if (!formProps.name) {
        errors.name = '이름을 입력하세요';
    }

    else if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    else if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    else if (!formProps.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    else if (formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match';
    }
    else {
        console.log('sineupstep2');
        sineupStep(2);
    }
    return errors;
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error,
        step : state.step.signup_step
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({sineupStep}, dispatch);
}

connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default reduxForm({
    form: 'signup',
    fields: ['name','email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(SignUp);
