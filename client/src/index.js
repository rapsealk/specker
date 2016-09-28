import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';

import { AUTH_USER, TAG_INCOMPLETE_USER } from './actions/types';

// import App from './components/app';
import reducers from './reducers';

import routes from './routes';
import reduxThunk from 'redux-thunk';



const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
const status = localStorage.getItem('status');
// If we have a token, consider the user to be signed in
if (token) {
    console.log("status", status);
    if(status==AUTH_USER){
        store.dispatch({ type: AUTH_USER });
    }
    // we need to update application state
    else{
        console.log("hello","good!");
        store.dispatch({type: TAG_INCOMPLETE_USER});
        localStorage.setItem('status', TAG_INCOMPLETE_USER);
        //추후에 이부분에서 로직 처리가 필요.. 여기서 바로 TAG_INCOMPLETE_USER를 넣을게 아니라, 서버를 통해 확인해야함. status만 지워진 경우가 있음.
    }
}


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>
    , document.querySelector('#container'));
