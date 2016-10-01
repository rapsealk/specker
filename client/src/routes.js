import React from 'react';
import { Route, IndexRoute } from 'react-router';
import RequireAuth from './containers/launch/auth/require_auth'
import RequireTagAuth from './containers/launch/auth/require_tagAuth'



import App from './components/app';
import Launch from './components/launch';
import Classification from './components/classification';
import Index from './components/index';
import Newsfeed from './containers/newsfeed/newsfeed';
import Google_Map from './components/google_map';

export default(
    <Route path="/" component={App} >
        <IndexRoute component={Launch} />
        <Route path="/google" component={Google_Map}/>
        <Route path="/classification" component={RequireAuth(Classification)}/>
        <Route path="/home" component={RequireTagAuth(Index)}>
            <IndexRoute component={Home} />
            <Route path="/newsfeed" component={Newsfeed}/>
        </Route>
    </Route>
);