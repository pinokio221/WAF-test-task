import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import contentReducer from './reducers'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

let reducers = combineReducers({
    content: contentReducer,
    form: formReducer
})

const store = createStore(reducers, compose(applyMiddleware(thunk)));

window.store = store;
export default store;