import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import ReducerLaunch from './reducer-launch';
import ReducerAuth from './reducer-auth';
import ReducerClassification from './reducer-classification';
import ReducerIndex from './reducer-index';

const rootReducer = combineReducers({
    launch: ReducerLaunch,
    form,
    auth: ReducerAuth,
    classificationTagData: ReducerClassification,
    index: ReducerIndex
});

export default rootReducer;

