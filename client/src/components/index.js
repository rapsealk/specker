import React, { Component } from 'react';
import IndexNavbar from '../containers/index/index-navbar';
import IndexSidebar from '../containers/index/index-sidebar';
import io from 'socket.io-client'
let socket = io('http://127.0.0.1:3000');

class Index extends Component{
    constructor () {
        super();

        socket.emit('sang', 'good!');
    }
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

