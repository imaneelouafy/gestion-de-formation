// store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk, withExtraArgument } from 'redux-thunk';
import employeReducer from './employeReducer';

const store = createStore(employeReducer, applyMiddleware(thunk));

export default store;
