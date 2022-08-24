import { configureStore } from '@reduxjs/toolkit'
import authReducer from '/reducers/auth.js'

export default configureStore({
  reducer: {authReducer}
})