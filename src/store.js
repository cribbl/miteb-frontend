import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'

const middleware = [thunkMiddleware]

// if(process.env.REACT_APP_NODE_ENV != 'production')
// 	middleware.push(createLogger())
if (window.location.host.indexOf('prod') == -1) { middleware.push(createLogger()) }

export const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
)
