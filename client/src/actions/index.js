import { LAUNCH_PAGE_STATE, LAUNCH_LINK_STATE, AUTH_ERROR, AUTH_USER, UN_AUTH_USER,
    SAVE_CLASSIFICATION_TAG_DATA,SIGN_UP_INCOMPLETE_USER, GET_CLASSIFICATION_TAG_DATA, TAG_INCOMPLETE_USER, SIDE_BAR_STATE, SINE_UP_STATE
} from './types';

import axios from 'axios';
import { browserHistory } from 'react-router';
import 'whatwg-fetch'
const ROOT_URL = 'http://127.0.0.1:3000';
var qs = require('qs');
var HTML = require('html-parse-stringify')
// const ROOT_URL = 'http://1.236.126.73:3000';

export function launchUpdatePageState(pageState){
    return function(dispatch){
        dispatch({
            type:LAUNCH_PAGE_STATE,
            payload:pageState
        });
        dispatch({
            type:UN_AUTH_USER
        });
    }

}

export function launchUpdateLinkState(linkState){
    return function(dispatch){
        dispatch({
            type:LAUNCH_LINK_STATE,
            payload:linkState
        });
        dispatch({
            type:UN_AUTH_USER
        });
    }

}




export function signinUser(email, password ) {
    return function(dispatch) {
        // Submit email/password to the server
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                console.log("nb2",response);
                var userStatus = response.data.userStatus;
                if(userStatus==SIGN_UP_INCOMPLETE_USER){
                    console.log("here?",response.data.userStatus);
                    dispatch({ type: SIGN_UP_INCOMPLETE_USER });
                }
                else if(userStatus==TAG_INCOMPLETE_USER){
                    console.log("nb3",response);

                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('status', response.data.userStatus);
                    dispatch({ type:  TAG_INCOMPLETE_USER });
                    browserHistory.push('/classification');
                }
                else{

                    console.log("nb4",response);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('status', response.data.userStatus);
                    dispatch({ type:  AUTH_USER });
                    browserHistory.push('/home');
                }

            })
            .catch(response => {
                console.log("nb",response);
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function signupUser(value) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, value)
            .then(response => {
                console.log("haha",response.data);
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('email', response.data.email);
                dispatch({ type: response.data.userStatus });

            })
            .catch(response => {
                dispatch(authError(response.response.data.error))
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER };
}

export function getClassificationTagData(keyword, callback) {
    return function (dispatch) {
        console.log("yuri",localStorage.getItem('token') );

        axios.post(`${ROOT_URL}/getClassification`,{keyword:keyword}, {
            headers: {
                authorization: localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                dispatch({
                    type: GET_CLASSIFICATION_TAG_DATA,
                    payload: response.data
                });
                callback();
            })
            .catch(response => {
                console.log("whywhy?", response.response.data);
            });
    }
}

export function saveClassificationSearchData(tags) {
    return function(dispatch) {

        let tagNames=[];
        for(var tag in tags){
            tagNames.push(tags[tag].text);
        }
            console.log("bb", localStorage.getItem('token'));
        axios.post(`${ROOT_URL}/saveClassification`, { tag:tagNames, token: localStorage.getItem('token')},{
            headers: { 'authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json'}
        })
            .then(response => {
                // dispatch({ type: AUTH_USER });
                // localStorage.setItem('token', response.data.token);
                // browserHistory.push('/classification');
                console.log("good", response);
                dispatch({ type: AUTH_USER });
                console.log("good1", response);
                // - Save the JWT token
                localStorage.setItem('token', response.data.token);
                console.log("good2", response);
                localStorage.setItem('status', response.data.userStatus);
                console.log("good3", response);
                // - redirect to the route '/feature'
                browserHistory.push('/home');
                console.log("good4", response);
            })
            .catch(response => {
                console.log("bad1");
                // dispatch(authError(response.data.error))
            });
    }
}


export function changeSidebarState(state) {
    return function(dispatch){
        dispatch({
            type:SIDE_BAR_STATE,
            payload:state
        })
    }
}

export function signUpAuth(token){

    return function(dispatch) {
        axios.post(`${ROOT_URL}/signUpConfirm`,null, {
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            }
        }).then(response => {

            dispatch({ type: response.data.userStatus });
            // - Save the JWT token
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('status', response.data.userStatus);
            browserHistory.push('/classification');

            })
            .catch(response => {
                dispatch(authError(response.response.data.error))
            });
    }


}


export function saveFeed(html) {
    return function(dispatch) {
        var paramHTML  = html.innerHTML;
        console.log(paramHTML);
        var ast = HTML.parse(paramHTML);

        console.log(ast);
        // fetch(`${ROOT_URL}/saveFeed`, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'text/plain',
        //         'authorization': localStorage.getItem('token')
        //     },
        //     body: JSON.stringify({
        //         paramHTML
        //     })
        // });

        axios.post(`${ROOT_URL}/saveFeed`, {html:ast},{
            headers: { 'authorization': localStorage.getItem('token')}
        })
            .then(response => {
                console.log(response);
                // dispatch({ type: AUTH_USER });

                browserHistory.push('/home');
                // console.log("good4", response);
            })
            .catch(response => {
                console.log(response);
                // dispatch(authError(response.data.error))
            });
    }
}



