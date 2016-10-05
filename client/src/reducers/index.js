import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import ReducerLaunch from './reducer-launch';
import ReducerAuth from './reducer-auth';
import ReducerClassification from './reducer-classification';
import ReducerIndex from './reducer-index';
import ReducerSignup from './reducer-singup';

const rootReducer = combineReducers({
    launch: ReducerLaunch,
    form,
    auth: ReducerAuth,
    classificationTagData: ReducerClassification,
    index: ReducerIndex,
    step : ReducerSignup
});

export default rootReducer;

