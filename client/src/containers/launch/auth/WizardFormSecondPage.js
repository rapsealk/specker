import React,{Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate2'
import renderField from './renderField'
import Geosuggest from 'react-geosuggest';
import asyncValidate from './asyncValidate'
import * as actions from '../../../actions';


var isAdressValid=true;
let address = "대한민국 서울특별시 관악구 서울대학교";
const renderError = ({ meta: { touched, error } }) => (
    touched && error ? <span>{error}</span> : <span className="row"> </span>);
class WizardFormSecondPage extends Component{

    handleFormSubmit(value) {
        // Need to do something to log user in
        console.log("i ssibal!");
        console.log(address);
        console.log(value);
        // this.props.signinUser({ email, password });
    }

    constructor(props) {
        super(props);
        this.state = {
            queue: []
        };
        console.log(props);

    }
    onSuggestSelect(suggest) {
        console.log("ha ssibal!"+suggest);
        console.log(suggest);
        isAdressValid=true;
        address=""+suggest.label;
        this.setState({queue:[]});

    }
    onBlur(value){
        console.log("ha ssibal!"+value);

        var temp = this.state.queue.shift();
        if(value!=temp){
            // this.update(temp);
            isAdressValid=false;
        }
        else{
            isAdressValid=true;

        }
        address=""+value;
        console.log(this.props);
        this.setState({queue:[]});


    }
    onChange(suggest){
        isAdressValid=false;
    }
    onFocus(value){
        console.log("ha ssibal!"+value);

    }

    onKeyPress(event){
        this.setState({ queue: [] });
        console.log("sdasdasdasdas");
        console.log(event);

    }

    onActivateSuggest(suggest){


    }
    onSuggestNoResults(userInput){
        console.log("ha ssibal!"+userInput);
        isAdressValid=false;

    }
    getSuggestLabel(suggest){

        this.setState({queue: this.state.queue.concat(suggest.description)});        // queue is now [2]
        // this.setState({ queue: temp });
        return suggest.description;
    }

    render(){
        const { handleSubmit ,invalid ,pristine, submitting, previousPage } = this.props;
        console.log("hahaha!: "+isAdressValid+"sajdasd: "+invalid);
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="SignUpBox">
                <div className="SignUpLogo">
                    SIGN UP
                </div>
                <div className="SignUp-Line"></div>
                <div>
                    <label className="SignUp-white">성별</label>
                    <div className="SignUp-letter">
                        <label><Field name="sex" component="input" type="radio" value="male"/> Male</label>
                        <label><Field name="sex" component="input" type="radio" value="female"/> Female</label>
                        <Field name="sex" component={renderError}/>
                    </div>
                    <div className="SignUp-letter">
                        <Field name="age" type="text" component={renderField} label="나이" placeholder="ex)23"/>
                    </div>
                    <Geosuggest
                        className="SignUp-letter"
                        placeholder="ex)마두동,신논현동,청담동"
                        initialValue="대한민국 서울특별시 관악구 서울대학교"
                        onSuggestSelect={this.onSuggestSelect.bind(this)}
                        onActivateSuggest = {this.onActivateSuggest.bind(this)}
                        country="kr"
                        onKeyPress={this.onKeyPress.bind(this)}
                        onSuggestNoResults={this.onSuggestNoResults}
                        onChange={this.onChange.bind(this)}
                        onFocus={this.onFocus.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                        autoActivateFirstSuggest={true}
                        getSuggestLabel={this.getSuggestLabel.bind(this)}
                        location={new google.maps.LatLng(37.459882, 126.95190530000002)}
                        radius="20" />
                </div>

                {isAdressValid==false||invalid==true ? <button type="button" disabled={pristine} className="next-button-false" >Next</button>  : <button type="submit" className="next-button-true" >Next</button>}
            </form>
        )
    }

}


export default reduxForm({
    form: 'wizard',  //Form name is same
    destroyOnUnmount: false,
    validate,
    asyncValidate,
    asyncBlurFields: [ 'email' ]
}, null, actions)(WizardFormSecondPage)