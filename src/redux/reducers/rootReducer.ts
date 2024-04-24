import { combineReducers } from 'redux'
import resetReducer from '../features/resetSlice'
import authReducer from '../features/loginSlice'

const rootReducer = combineReducers({
  resetData: resetReducer,
  authData: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
