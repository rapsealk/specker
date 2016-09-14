import React, { Component } from 'react';



class IndexNavbar extends Component{
    render(){
        return(
            <div role="navigation" className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar" className="navbar-toggle collapsed"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button><a href="#" className="navbar-brand">specker(LOGO)</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">뉴스피드</a></li>
                            <li><a href="#">홈</a></li>
                            <li><a href="#">팀찾기</a></li>
                            <li><a href="#">팀&채팅</a></li>
                            <li><a href="#" data-toggle="dropdown" className="dropdown-toggle">설정 <b className="caret"></b></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Profile</a></li>
                                    <li><a href="#">Message</a></li>
                                    <li><a href="#addCard" data-toggle="modal">Upload</a></li>
                                    <li className="divider"></li>
                                    <li><a href="#">Log out</a></li>
                                </ul>
                            </li>
                            <li className="dropdown"><a id="dLabel" role="button" data-toggle="dropdown" href="#"><i className="glyphicon glyphicon-bell"></i></a>
                                <ul role="menu" aria-labelledby="dLabel" className="dropdown-menu notifications">
                                    <div className="notification-heading">
                                        <h4 className="menu-title">Notifications</h4>
                                        <h4 className="menu-title pull-right">View all<i className="glyphicon glyphicon-circle-arrow-right"></i></h4>
                                    </div>
                                    <li className="divider"></li>
                                    <div className="notifications-wrapper"><a href="#" className="content">
                                        <div className="notification-item">
                                            <h4 className="item-title">Evaluation Deadline 1 · day ago</h4>
                                            <p className="item-info">Marketing 101, Video Assignment</p>
                                        </div></a><a href="#" className="content">
                                        <div className="notification-item">
                                            <h4 className="item-title">Evaluation Deadline 1 · day ago</h4>
                                            <p className="item-info">Marketing 101, Video Assignment</p>
                                        </div></a><a href="#" className="content">
                                        <div className="notification-item">
                                            <h4 className="item-title">Evaluation Deadline 1 • day ago</h4>
                                            <p className="item-info">Marketing 101, Video Assignment</p>
                                        </div></a><a href="#" className="content">
                                        <div className="notification-item">
                                            <h4 className="item-title">Evaluation Deadline 1 • day ago</h4>
                                            <p className="item-info">Marketing 101, Video Assignment</p>
                                        </div></a><a href="#" className="content">
                                        <div className="notification-item">
                                            <h4 className="item-title">Evaluation Deadline 1 • day ago</h4>
                                            <p className="item-info">Marketing 101, Video Assignment</p>
                                        </div></a><a href="#" className="content">
                                        <div className="notification-item">
                                            <h4 className="item-title">Evaluation Deadline 1 • day ago</h4>
                                            <p className="item-info">Marketing 101, Video Assignment</p>
                                        </div></a></div>
                                    <li className="divider"></li>
                                    <div className="notification-footer">
                                        <h4 className="menu-title">View all<i className="glyphicon glyphicon-circle-arrow-right"></i></h4>
                                    </div>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

              </div>



        );
    }
}

export default IndexNavbar;

