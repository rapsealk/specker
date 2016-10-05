import React from 'react'
const renderField = ({ input, label, type, meta: { asyncValidating, touched, error } }) => (
    <div>
        <label>{label}</label>
        <div className={asyncValidating ? 'async-validating' : ''}>
            <input {...input} placeholder={label} type={type}/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

export default renderField