import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../../actions';
import { sineupStep  } from '../../../actions/index'


import WizardFormFirstPage from './WizardFormFirstPage'
import WizardFormSecondPage from './WizardFormSecondPage'


class Signup extends Component {
    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
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
        const { onSubmit } = this.props
        const { page } = this.state
        return (<div>
                {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage}/>}
                {page === 2 && <WizardFormSecondPage previousPage={this.previousPage} onSubmit={this.nextPage}/>}
            </div>
        )
    }
}

Signup.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default Signup;