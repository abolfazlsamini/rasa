import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTHORIZED_SUCCESS,
  AUTHORIZED_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../actions/types";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
      };
    case AUTHORIZED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTHORIZED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
export default authReducer;
