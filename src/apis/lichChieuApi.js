import callApiMovie from "utils/callApiMovie";

const lichChieuApi = {
  layThongTinHeThongRap() {
    return callApiMovie("QuanLyRap/LayThongTinHeThongRap");
  },
  layThongTinHeThongCumRap(maHeThongRap) {
    return callApiMovie(
      `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  },
  taoLichChieu(thongTinLichChieu, token) {
    return callApiMovie(
      `QuanLyDatVe/TaoLichChieu`,
      "POST",
      thongTinLichChieu,
      token
    );
  },
};

export default lichChieuApi;
