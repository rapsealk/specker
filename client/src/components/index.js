import React, { Component } from 'react';
import IndexNavbar from '../containers/index/index-navbar';
import IndexSidebar from '../containers/index/index-sidebar';

class Index extends Component{
    render(){
        return(
            <div className="index">
                <IndexNavbar />
                {this.props.children}

                <IndexSidebar />
            </div>

        );
    }
}

export default Index;

