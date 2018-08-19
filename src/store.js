import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const middleware = [thunkMiddleware];

if(process.env.NODE_ENV === 'development')
	middleware.push(createLogger())

export const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);