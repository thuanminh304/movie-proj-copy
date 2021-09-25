import { GROUP_ID } from "settings/apiConfig";
import callApiMovie from "utils/callApiMovie";
const adminMovieApi = {
  getAllMovie(tenPhim = "") {
    if (tenPhim !== "") {
      return callApiMovie(
        `QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${tenPhim}`
      );
    }
    return callApiMovie(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);
  },
  addMovie(formdata) {
    return callApiMovie("QuanLyPhim/ThemPhimUpLoadHinh", "POST", formdata);
  },
  getInforDetailMovieEdit(maPhim) {
    return callApiMovie(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  },
  editMovieUpLoad(formdata, token) {
    return callApiMovie(
      "QuanLyPhim/CapNhatPhimUpLoad",
      "POST",
      formdata,
      token
    );
  },
  deleteMovie(maPhim, token) {
    return callApiMovie(
      `QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
      "DELETE",
      null,
      token
    );
  },
};

export default adminMovieApi;
