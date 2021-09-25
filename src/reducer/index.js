import { combineReducers } from "redux";
import { movieListReducer } from "../components/Movie/modules/reducer";
import { theaterSystemReducer } from "../components/Theater/TheaterSystem/modules/reducer";
import { theaterClusterReducer } from "../components/Theater/TheaterCluster/modules/reducer";
import authUserReducer from "containers/shared/Auth/Login/module/reducer";
import movieEditReducer from "containers/Admin/Movie/module/reducer";
import allUserReducer from "containers/Admin/User/module/reducer";
import { movieShowtimesReducer } from "../containers/Home/MovieChair/Purchase/modules/reducer";
export const rootReducer = combineReducers({
  movieListReducer,
  theaterSystemReducer,
  theaterClusterReducer,
  authUserReducer,
  allUserReducer,
  movieEditReducer,
  movieShowtimesReducer,
});
