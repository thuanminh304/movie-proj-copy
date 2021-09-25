import {
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT,
} from "./type";

const initialState = {
  currentUser: null,
  loading: false,
  err: null,
};

const authUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER_REQUEST:
      return { ...state, loading: true, err: null };
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, currentUser: payload };
    case LOGIN_USER_FAIL:
      return { ...state, loading: false, err: payload };
    case LOGOUT:
      return { ...state, currentUser: payload ,err:null};
    default:
      return state;
  }
};

export default authUserReducer;
