import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
    class TagAuthentication extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        };

        componentWillMount() {
            if (!this.props.authenticated) {
                console.log("1");
                this.context.router.push('/');

            }
            else if(!this.props.tagAuthenticated){
                console.log("2");
                this.context.router.push('/classification');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                console.log("3");
                this.context.router.push('/');
            }
            else if(!nextProps.tagAuthenticated){
                console.log("4");
                this.context.router.push('/classification');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state) {
        console.log(state);
        return { authenticated: state.auth.authenticated, tagAuthenticated: state.auth.tagAuthenticated };
    }

    return connect(mapStateToProps)(TagAuthentication);
}
