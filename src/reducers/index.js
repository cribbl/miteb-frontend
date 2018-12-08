import { combineReducers } from 'redux'

import { authentication } from './userReducer'
import { toggler } from './toggleReducer'
import { catalogueHandler } from './catalogueReducer'

const rootReducer = combineReducers({
  authentication,
  toggler,
  catalogueHandler
})

export default rootReducer
