import Login from "../containers/Auth/Login";
import Register from "../containers/Auth/Register";
import SignIn from "containers/Auth/SignIn/SignIn";
import BookingDetail from "../containers/Home/BookingDetail";
import HomePage from "../containers/Home/HomePage";
//code Thuan
import Dashboard from "../containers/Admin/Dashboard/Dashboard";
import ShowTime from "containers/Admin/Dashboard/ShowTime";
import EditMovie from "containers/Admin/Movie/EditMovie";
import Movie from "containers/Admin/Movie/Movie";
import AddUser from "containers/Admin/User/AddUser";
import EditUser from "containers/Admin/User/EditUser";
import User from "containers/Admin/User/User";
import Home from "containers/client/Home/Home";
import AddNewMovie from "containers/Admin/Movie/AddNewMovie";
import Purchase from "../containers/Home/MovieChair/Purchase";

export const routeHome = [
  { exact: true, path: ["/", "/home"], component: HomePage, isPrivate: false },
  {
    exact: false,
    path: "/booking-detail/:maPhim",
    component: BookingDetail,
    isPrivate: true,
  },
  {
    exact: false,
    path: "/purchase/:maLichChieu",
    component: Purchase,
    isPrivate: true,
  },
];

// export const routeAdmin = [];

export const routeAuth = [
  { exact: false, path: "/login", component: Login, isPrivate: false },
  { exact: true, path: "/sign-in", component: SignIn, isPrivate: false },
  { exact: false, path: "/register", component: Register, isPrivate: false },
];
export const clientRoutes = [
  // {
  //   component: Home,
  //   exact: true,
  //   isPrivate: false,
  //   path: "/homeAdmin",
  // },
];
export const adminRoutes = [
  {
    component: Dashboard,
    exact: true,
    isPrivate: true,
    path: "/admin",
  },
  {
    component: Movie,
    exact: true,
    isPrivate: true,
    path: "/admin/movie",
  },
  {
    component: AddNewMovie,
    exact: true,
    isPrivate: true,
    path: "/admin/movie/addnew",
  },
  {
    component: EditMovie,
    exact: true,
    isPrivate: true,
    path: "/admin/movie/editmovie/:maPhim",
  },
  {
    component: ShowTime,
    exact: true,
    isPrivate: true,
    path: "/admin/movie/showtime/:maPhim",
  },
  {
    component: User,
    exact: true,
    isPrivate: true,
    path: "/admin/user",
  },
  {
    component: AddUser,
    exact: true,
    isPrivate: true,
    path: "/admin/user/adduser",
  },
  {
    component: EditUser,
    exact: true,
    isPrivate: true,
    path: "/admin/user/edituser/:taiKhoan",
  },
];
