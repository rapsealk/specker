import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import asyncValidate from './asyncValidate'

/*

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
 <button className = "btn btn-primary" disabled={pristine}>Next</button>
 </form>
 */
const WizardFormFirstPage = (props) => {
    const { handleSubmit } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field name="email" type="email" component={renderField} label="Email"/>
            <Field name="lastName" type="text" component={renderField} label="Last Name"/>
            <div>
                <button className="next">Next</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'wizard',              // <------ same form name
    destroyOnUnmount: false,     // <------ preserve form data
    validate,
    asyncValidate,
    asyncBlurFields: [ 'email' ]
})(WizardFormFirstPage)