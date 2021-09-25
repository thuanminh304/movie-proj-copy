import adminMovieApi from "apis/adminMovieApi";

const {
  GET_INFOR_DETAIL_MOVIE_EDIT,
  EDIT_MOVIE,
  DELETE_MOVIE,
} = require("./type");

export const actGetInforMovieDetailEdit = (maPhim) => {
  return (dispatch) => {
    adminMovieApi
      .getInforDetailMovieEdit(maPhim)
      .then((res) => {
        dispatch({
          type: GET_INFOR_DETAIL_MOVIE_EDIT,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
export const actEditMovie = (formdata, token,history) => {
  return (dispatch) => {
    adminMovieApi
      .editMovieUpLoad(formdata, token)
      .then((res) => {
        alert("Cập nhật thành công !");
        history.push("/admin/movie")
        dispatch({
          type: EDIT_MOVIE,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const actDeleteMovie = (maPhim,token) => {
  return (dispatch) => {
    adminMovieApi
      .deleteMovie(maPhim,token)
      .then((res) => {
        alert("Xóa phim thành công !")
        dispatch({
          type: DELETE_MOVIE,
        });
      })
      .catch((err) => alert(err.response?.data));
  };
};
