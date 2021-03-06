import React from 'react';
import { Route, IndexRoute } from 'react-router';
import RequireAuth from './containers/launch/auth/require_auth'
import RequireTagAuth from './containers/launch/auth/require_tagAuth'


import App from './components/app';
import Launch from './components/launch';
import Classification from './components/classification';
import Index from './components/index';
import Newsfeed from './containers/newsfeed/newsfeed';
import Home from './containers/home/home';
import SignUpAuth from './containers/launch/auth/sign-up-auth';

import Search_geocoding from './components/Search_geocoding';

export default(
    <Route path="/" component={App} >
        <IndexRoute component={Launch} />
        <Route path="/google" component={Search_geocoding}/>
        <Route path="/signUpConfirm" component={SignUpAuth}/>
        <Route path="/classification" component={RequireAuth(Classification)}/>
        <Route path="/home" component={Index}>
            <IndexRoute component={Home} />
        </Route>
        <Route path="/newsfeed" component={Index}>
            <IndexRoute component={Newsfeed}/>
        </Route>
    </Route>
);