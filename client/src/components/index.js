import React, { Component } from 'react';
import IndexNavbar from '../containers/index/index-navbar';

class Home extends Component{
    render(){
        return(
            <div>
              <IndexNavbar />
                {this.props.children}
            </div>

        );
    }
}

export default Home;

