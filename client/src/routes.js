import React from 'react';
import { Route, IndexRoute } from 'react-router';
import RequireAuth from './containers/launch/auth/require_auth'
import RequireTagAuth from './containers/launch/auth/require_tagAuth'



import App from './components/app';
import Launch from './components/launch';
import Classification from './components/classification';
import Home from './components/home';


export default(
    <Route path="/" component={App} >
        <IndexRoute component={Launch} />
        <Route path="/classification" component={RequireAuth(Classification)}/>
        <Route path="/home" component={RequireTagAuth(Home)}/>
    </Route>
);