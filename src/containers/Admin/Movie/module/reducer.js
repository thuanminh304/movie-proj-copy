import { GET_INFOR_DETAIL_MOVIE_EDIT, EDIT_MOVIE, DELETE_MOVIE } from "./type";

const initialState = {
  editMovieDetail: {},
};

const movieEditReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_INFOR_DETAIL_MOVIE_EDIT:
      return { ...state, editMovieDetail: payload };
    case EDIT_MOVIE:
      return { ...state, editMovieDetail: payload };
    case DELETE_MOVIE:
      return { ...state };
    default:
      return state;
  }
};

export default movieEditReducer;
