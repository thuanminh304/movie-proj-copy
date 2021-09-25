import userApi from "apis/userApi";

const {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT,
} = require("./type");

const actLoginUserRequest = () => ({
  type: LOGIN_USER_REQUEST,
});
const actLoginUserSuccess = (currentUser) => ({
  type: LOGIN_USER_SUCCESS,
  payload: currentUser,
});
const actLoginUserFail = (err) => ({
  type: LOGIN_USER_FAIL,
  payload: err,
});

export const actLoginUser = (currentUser,history) => {
  return (dispatch) => {
    dispatch(actLoginUserRequest());
    userApi
      .loginUser(currentUser)
      .then((res) => {
        console.log(res.data);
        dispatch(actLoginUserSuccess(res.data));
        history.push("/")
      })
      .catch((err) => {
        dispatch(actLoginUserFail("Khong the dang nhap!"));
      });
  };
};

export const actLogoutUser = () => ({
  type: LOGOUT,
  payload:null
});
