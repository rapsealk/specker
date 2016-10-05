import React, { Component } from 'react';
import ClassificationSearchForm from '../containers/classification/classification-search-form';


class Classification extends Component{
    render(){
        return(
            <div className="classification-background">
                <ClassificationSearchForm />
            </div>

        );
    }
}

export default Classification;

