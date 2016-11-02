import React from 'react'
const renderField = ({ input, label, type, meta: { asyncValidating, touched, error } }) => (
    <div>
        <div className={asyncValidating ? 'async-validating' : ''}>
            <input {...input} className="SignUp-Input" placeholder={label} type={type}/>
            {touched && error ? <span className="row SignUp-white">{error}</span> : <span className="row">　</span>}
        </div>
    </div>
);

export default renderField