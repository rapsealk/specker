import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import ReducerLaunch from './reducer-launch';
import ReducerAuth from './reducer-auth';
import ReducerClassification from './reducer-classification';
const rootReducer = combineReducers({
    launch: ReducerLaunch,
    form,
    auth: ReducerAuth,
    classificationTagData:ReducerClassification
});

export default rootReducer;

