import React, { Component } from 'react';
import HomeBody from './home-body';
import HomeSidebar from './home-sidebar';

class Home extends Component{
    render(){
        return(
            <div>
                <HomeBody/>
                <HomeSidebar/>
            </div>
        )
    }
}

export default Home;