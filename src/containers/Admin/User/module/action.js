import userApi from "apis/userApi";

const {
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  
} = require("./type");

const actGetAllUserRequest = () => ({
  type: GET_ALL_USER_REQUEST,
});
const actGetAllUserSuccess = (listAllUser) => ({
  type: GET_ALL_USER_SUCCESS,
  payload: listAllUser,
});
const actGetAllUserFail = (err) => ({
  type: GET_ALL_USER_FAIL,
  payload: err,
});

export const actGetAllUser = (hoTen) => {
  return (dispatch) => {
    dispatch(actGetAllUserRequest());
    userApi
      .getAllUser(hoTen)
      .then((res) => {
        dispatch(actGetAllUserSuccess(res.data))
      })
      .catch((err) => dispatch(actGetAllUserFail(err.resonse?.data)));
  };
};


