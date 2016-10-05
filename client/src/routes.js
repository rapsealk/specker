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


import Search_geocoding from './components/Search_geocoding';


export default(
    <Route path="/" component={App} >
        <IndexRoute component={Launch} />
        <Route path="/google" component={Search_geocoding}/>
        <Route path="/classification" component={RequireAuth(Classification)}/>
        <Route path="/home" component={RequireTagAuth(Index)}>
            <Route component={RequireTagAuth(Home)} />
        </Route>
        <Route path="/newsfeed" component={RequireTagAuth(Index)}>
            <Route component={RequireTagAuth(Newsfeed)}/>
        </Route>
    </Route>
);