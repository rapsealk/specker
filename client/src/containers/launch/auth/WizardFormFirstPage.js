import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'
import asyncValidate from './asyncValidate'

class WizardFormFirstPage extends Component{

    render(){
        const {  label,handleSubmit ,invalid ,pristine, asyncValidating} = this.props;
        return(
            <form onSubmit={handleSubmit} className="SignUpBox">
                <div className="SignUpLogo">
                    SIGN UP
                </div>
                <div className="SignUp-Line"></div>

                <div>
                    <label className="SignUp-white">이름</label>
                    <div className="SignUp-letter">
                        <Field name="name" type="text" className="test" component={renderField} label="이름"/>
                    </div>
                    <label className="SignUp-white">이메일</label>
                    <div className="SignUp-letter">
                        <Field  name="email" type="email" component={renderField} label="이메일"/>
                    </div>
                    <label className="SignUp-white">비밀번호</label>
                    <div className="SignUp-letter">
                        <Field name="password" type="password" component={renderField} label="비밀번호"/>
                    </div>
                    <label className="SignUp-white">비밀번호 확인</label>
                    <div className="SignUp-letter">
                        <Field name="passwordconfirm" type="password" className="SignUp-letter" component={renderField} label=""/>
                    </div>
                    {invalid==true&&asyncValidating==false? <button type="button" disabled={pristine} className="next-button-false" >Next</button>  : <button type="submit" className="next-button-true" >Next</button>}
                </div>
            </form>
        );
    }
}


/*
*
 <div>
 <button className="next-button" disabled={pristine}>Next</button>
 </div>

 * */
export default reduxForm({
    form: 'wizard',              // <------ same form name
    destroyOnUnmount: false,     // <------ preserve form data
    asyncValidate,
    validate,
    asyncBlurFields: [ 'email' ]
})(WizardFormFirstPage)