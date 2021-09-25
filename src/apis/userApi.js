import { GROUP_ID } from "settings/apiConfig";
import callApiMovie from "utils/callApiMovie";

const userApi = {
  loginUser(user) {
    return callApiMovie("QuanLyNguoiDung/DangNhap", "POST", user);
  },
  addUser(formData, accessToken) {
    return callApiMovie(
      "QuanLyNguoiDung/ThemNguoiDung",
      "POST",
      formData,
      accessToken
    );
  },
  getAllUser(hoTen = "") {
    if (hoTen !== "") {
      return callApiMovie(
        `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${hoTen}`
      );
    }
    return callApiMovie(
      `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`
    );
  },
  deleteUser(taiKhoan, accessToken) {
    return callApiMovie(
      `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
      "DELETE",
      null,
      accessToken
    );
  },
  getInforDetailUser(taiKhoan) {
    return callApiMovie(
      `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${taiKhoan}`
    );
  },
  editUser(formData, accessToken) {
    return callApiMovie(
      "QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      "PUT",
      formData,
      accessToken
    );
  },
};

export default userApi;
