import React , {Component} from 'react';
import StepZilla from 'react-stepzilla';
import {connect} from 'react-redux';
import Step2 from './Step1';
import Signup from './signup';
import * as actions from '../../../actions';
import { sineupStep  } from '../../../actions/index'


class StepFormTest extends Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render(){
        const  steps = [
            {name: 'step1' ,component: <Signup />},
            {name: 'step2' ,component: <Step2 />}
        ]

        console.log(this.props.step);
        return(
            <div className='example'>
            <div className="step-progress">
                <StepZilla steps={steps}
                           stepsNavigation={true}
                           showNavigation={this.props.step==2? true : false}
                           prevBtnOnLastStep={true}
                           dontValidate={true}
                           preventEnterSubmission={false}
                           nextTextOnFinalActionStep={"Save"}
                />
            </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {step:state.step.signup_step};
}

export default connect(mapStateToProps)(StepZilla);
