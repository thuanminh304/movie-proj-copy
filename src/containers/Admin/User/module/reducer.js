import {
  
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
} from "./type";

const initialState = {
  listAllUser: [],
  loading: false,
  err: null,
};

const allUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_USER_REQUEST:
      return { ...state, loading: true };
    case GET_ALL_USER_SUCCESS:
      return { ...state, listAllUser: payload, loading: false };
    case GET_ALL_USER_FAIL:
      return { ...state, loading: false };
    
    default:
      return state;
  }
};

export default allUserReducer;
