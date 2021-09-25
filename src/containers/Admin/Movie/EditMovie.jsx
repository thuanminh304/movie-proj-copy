import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, InputNumber } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { GROUP_ID } from "settings/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { actEditMovie, actGetInforMovieDetailEdit } from "./module/action";
import * as yup from "yup";
//CONTENT
export default function EditMovie() {
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { editMovieDetail } = useSelector((state) => state.movieEditReducer);
  const { currentUser } = useSelector((state) => state.authUserReducer);
  const params = useParams();
  // lấy thống tin chi tiết 1 bộ phim để thay đổi
  useEffect(() => {
    dispatch(actGetInforMovieDetailEdit(params.maPhim));
  }, []);
  //tạo form để lấy lại giá trị các trường input nhờ vào api lấy thông tin phim qua mã phim
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: editMovieDetail?.maPhim,
      tenPhim: editMovieDetail?.tenPhim,
      trailer: editMovieDetail?.trailer,
      moTa: editMovieDetail?.moTa,
      maNhom: GROUP_ID,
      ngayKhoiChieu: editMovieDetail?.ngayKhoiChieu,
      danhGia: editMovieDetail?.danhGia,
      hinhAnh: null,
    },
    validationSchema: yup.object({
      tenPhim: yup
        .string()
        .matches(
          /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/
        )
        .required(),
      trailer: yup.string().required(),
      moTa: yup.string().required(),
      ngayKhoiChieu: yup
        .date()
        .default(() => {
          return new Date();
        })
        .required(),
      maNhom: yup.string(),
      hinhAnh: yup.string().required("Bạn chưa chọn hình ảnh !"),
      danhGia: yup
        .string()

        .matches(/^[0-9]+$/)
        .required(),
    }),
    onSubmit: (values) => {
      //tạo formdata=> đưa giá trị values từ formik vào formData
      let formData = new FormData();

      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      //goi api post edit len server(đưa history vào để action nhận được và khi thay đỏi thanh công sẽ redirect trực tiếp qua trang phim và cập nhật lại mảng phim)
      dispatch(actEditMovie(formData, currentUser.accessToken, history));
    },
  });
  const handleChangeDatapicker = (value) => {
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  
  const handleChangeFile = (e) => {
    // lấy file từ event
    let file = e.target.files[0];
    // tạo đối tượng để đọc file hiển thị ảnh
    if (file) {
      formik.setFieldValue("hinhAnh", file);

      let readFile = new FileReader();
      readFile.readAsDataURL(file);
      setImgSrc(readFile.result);
      readFile.onload = function (e) {
        setImgSrc(e.target.result);
      };
    }
  };
// tạo biến riêng để tránh sử dụng lại nhiều ảnh hưởng performance
const errors = formik.errors;
const touched = formik.touched;
const values = formik.values;
  return (
    <>
      <h3>CẬP NHẬT PHIM</h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        className="text text-left"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
          {errors.tenPhim &&
            touched.tenPhim &&
            (values.tenPhim === "" ? (
              <div className="styleErrors">
                <p>_ Không được để trống</p>
              </div>
            ) : (
              <div className="styleErrors">
                <p>_ Không sử dụng dấu câu và các ký tự đặc biệt</p>
              </div>
            ))}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
          {errors.trailer && touched.trailer && (
            <div className="styleErrors">
              <p>_ Không được để trống</p>
            </div>
          )}
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />{" "}
          {errors.moTa && touched.moTa && (
            <div className="styleErrors">
              <p>_ Không được để trống</p>
            </div>
          )}
        </Form.Item>

        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            name="ngayKhoiChieu"
            format={"DD-MM-YYYY"}
            onChange={handleChangeDatapicker}
            value={moment(formik.values.ngayKhoiChieu)}
          />{" "}
          {errors.ngayKhoiChieu && touched.ngayKhoiChieu && (
            <div className="styleErrors">
              <p>_ Không được để trống</p>
            </div>
          )}
        </Form.Item>
        <Form.Item label="Đánh giá">
          <Input
            style={{ width: "100px" }}
            name="danhGia"
            onChange={formik.handleChange}
            value={formik.values.danhGia}
          />
          {errors.danhGia &&
            touched.danhGia &&
            (values.danhGia === "" ? (
              <div className="styleErrors">
                <p>_ Không được để trống</p>
              </div>
            ) : (
              <div className="styleErrors">
                <p>_ Chỉ được nhập số (1-10) !</p>
              </div>
            ))}
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <Input
            disabled
            type="file"
            name="hinhAnh"
            onChange={handleChangeFile}
            accept="image/jpg,image/jpeg,image/gif,image/png"
            value={formik.values.hinhAnh}
          />{" "}
          {errors.hinhAnh && touched.hinhAnh && (
            <div className="styleErrors">
              <p>_ Không được để trống</p>
            </div>
          )}
          <br />
          <img
            style={{ width: "150px", height: "150px" }}
            alt="..."
            src={imgSrc === "" ? editMovieDetail?.hinhAnh : imgSrc}
          />
        </Form.Item>
        <Form.Item className="text text-center">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button "
          >
            Cập nhật
          </Button>
          <Button
            type="primary"
            onClick={() => {
              history.push("/admin/movie");
            }}
            className="login-form-button ml-5"
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
