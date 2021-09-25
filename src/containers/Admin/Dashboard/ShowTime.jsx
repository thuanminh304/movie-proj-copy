import React, { useState, useEffect } from "react";
import { Select, DatePicker, Form, Button } from "antd";
import lichChieuApi from "apis/lichChieuApi";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router";
import moment from "moment";
import { useSelector } from "react-redux";
import * as yup from "yup";
// content
export default function ShowTime() {
  const history = useHistory();
  const params = useParams();
  let [marap, setmarap] = useState("");
  const [state, setState] = useState({
    heThongRap: [],
    heThongCumRap: [],
  });
  const { currentUser } = useSelector((state) => state.authUserReducer);
  //tạo formik để lấy nội dung trong form đưa lên api
  const formik = useFormik({
    initialValues: {
      maPhim: params.maPhim,
      tenHeThongRap: "",
      tenCumRap: "",
      tenRap: "",
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    // sét validate cho cả form
    validationSchema: yup.object({
      ngayChieuGioChieu: yup.string().required("Vui lòng chọn thời gian !"),
      tenRap: yup.string().required("Vui lòng chọn rạp !"),
      tenCumRap: yup.string().required("Vui lòng chọn cụm rạp !"),
      tenHeThongRap: yup.string().required("Vui lòng chọn hệ thống rạp !"),
      giaVe: yup
        .string()
        .matches(/^[0-9]*$/)
        .required("Vui lòng chọn giá vé !"),
    }),

    onSubmit: (values) => {
      lichChieuApi
        .taoLichChieu(values, currentUser.accessToken)
        .then((res) => {
          alert("Tạo lịch chiếu thành công !");
        })
        .catch((err) => {
          console.log("backend", err.response?.data);
        });
    },
  });
  // lấy thông tin hệ thống rạp
  useEffect(() => {
    lichChieuApi
      .layThongTinHeThongRap()
      .then((res) => {
        setState({
          ...state,
          heThongRap: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const optionsHeThongRap = state.heThongRap?.map((heThongRap, index) => ({
    label: heThongRap.tenHeThongRap,
    value: heThongRap.maHeThongRap,
  }));

  function handleChangeHeThongRap(heThongRap) {
    //từ hệ thóng rạp call api thấy thông tin cụm rạp
    lichChieuApi
      .layThongTinHeThongCumRap(heThongRap)
      .then((res) => {
        setState({
          ...state,
          heThongCumRap: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    formik.setFieldValue("tenHeThongRap", heThongRap);
  }

  const handleChangeCumRap = (idx) => {
    formik.setFieldValue("tenCumRap", idx);
    // render lại giá trị marap (number) để có thể render ra từng cụm rạp để lấy tên rạp
    setmarap((marap = idx));
  };

  const handleChangeMaRap = (maRap) => {
    formik.setFieldValue("maRap", maRap);
    formik.setFieldValue("tenRap", maRap);
  };

  const handleChangeDate = (time) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(time).format("DD-MM-YYYY hh:mm:ss")
    );
  };
  const onOk = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD-MM-YYYY hh:mm:ss")
    );
  };
  const handleChangeInputPrice = (price) => {
    formik.setFieldValue("giaVe", price);
  };

  // const showError = (formik) => {
  //   return (
  //     formik.errors.tenHeThongRap &&
  //     formik.touched.tenHeThongRap && (
  //       <p style={{ color: "red" }}>{formik.errors.tenHeThongRap}</p>
  //     )
  //   );
  // };
  let movie = {};
  if (localStorage.getItem("movieDetail")) {
    movie = JSON.parse(localStorage.getItem("movieDetail"));
  }
  return (
    <div className="d-flex">
      <div style={{ width: "50%" }}>
        <p style={{ fontWeight: "bolder", fontSize: "50px" }}>
          {movie.tenPhim}
        </p>
        <img src={movie.hinhAnh} width="300px" height="350px" alt="" />
      </div>
      <Form
        style={{ width: "50%" }}
        onSubmitCapture={formik.handleSubmit}
        className="text-left"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        <h3 className="text-center h1 ">Tạo lịch chiếu</h3>
        {/* FORM KHỞI TẠO LỊCH CHIẾU */}
        <Form.Item label="Tên hệ thống rạp">
          <Select
            options={optionsHeThongRap}
            onChange={handleChangeHeThongRap}
            placeholder="Chọn hệ thống rạp"
          />
          {formik.errors.tenHeThongRap && formik.touched.tenHeThongRap && (
            <p style={{ color: "red" }}>{formik.errors.tenHeThongRap}</p>
          )}
        </Form.Item>
        <Form.Item label="Tên cụm rạp">
          <Select
            options={state.heThongCumRap?.map((cumRap, idx) => ({
              label: cumRap.tenCumRap,
              value: idx,
            }))}
            onChange={handleChangeCumRap}
            placeholder="Chọn cụm rạp"
            name="tenCumRap"
          />
          {formik.errors.tenCumRap && formik.touched.tenCumRap && (
            <p style={{ color: "red" }}>{formik.errors.tenCumRap}</p>
          )}
        </Form.Item>
        <Form.Item label="Tên rạp">
          <Select
            options={state.heThongCumRap[marap]?.danhSachRap.map(
              (rap, idx) => ({
                label: rap.tenRap,
                value: rap.maRap,
              })
            )}
            onChange={handleChangeMaRap}
            placeholder="Chọn tên rạp"
          />
          {formik.errors.tenRap && formik.touched.tenRap && (
            <p style={{ color: "red" }}>{formik.errors.tenRap}</p>
          )}
        </Form.Item>
        <Form.Item label="Thời gian chiếu">
          <DatePicker
            format="DD-MM-YYYY hh:mm:ss"
            showTime
            onChange={handleChangeDate}
            onOk={onOk}
            placeholder="Chọn ngày"
          />
          {formik.errors.ngayChieuGioChieu &&
            formik.touched.ngayChieuGioChieu && (
              <p style={{ color: "red" }}>{formik.errors.ngayChieuGioChieu}</p>
            )}
        </Form.Item>
        <Form.Item label="Giá vé">
          <Select
            style={{ width: "100px" }}
            options={[
              {
                label: "75000",
                value: "75000",
              },
              {
                label: "90000",
                value: "90000",
              },
              {
                label: "110000",
                value: "110000",
              },
            ]}
            onChange={handleChangeInputPrice}
          />{" "}
          <span>VND</span>
          {formik.errors.giaVe && formik.touched.giaVe && (
            <p style={{ color: "red" }}>{formik.errors.giaVe}</p>
          )}
        </Form.Item>
        <Form.Item className="text-right">
          <Button htmlType="submit" type="primary xl">
            Tạo lịch chiếu
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            className="ml-5"
            onClick={() => {
              history.push("/admin/movie");
            }}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
