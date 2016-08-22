import React from 'react';
import { Route, IndexRoute } from 'react-router';
import RequireAuth from './containers/launch/auth/require_auth'


import App from './components/app';
import Launch from './components/launch';
import Classification from './components/classification';

export default(
    <Route path="/" component={App} >
        <IndexRoute component={Launch} />
        <Route path="/classification" component={RequireAuth(Classification)}/>
    </Route>
);