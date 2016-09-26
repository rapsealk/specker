import React, { Component } from 'react';
import IndexNavbar from '../containers/index/index-navbar';
import IndexSidebar from '../containers/index/index-sidebar';

class Home extends Component{
    render(){
        return(
            <div>
                <IndexNavbar />
                {this.props.children}

                <IndexSidebar />
            </div>

        );
    }
}

export default Home;

