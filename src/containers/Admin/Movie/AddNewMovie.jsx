import React, { useState } from "react";
import { Form, Input, Button, DatePicker, InputNumber } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import adminMovieApi from "apis/adminMovieApi";
import { GROUP_ID } from "settings/apiConfig";
import { useHistory } from "react-router";
import * as yup from "yup";
import "./Movie.scss";
export default function AddNewMovie() {
  const [imgSrc, setImgSrc] = useState("");
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: GROUP_ID,
      ngayKhoiChieu: "",
      danhGia: "",
      hinhAnh: {},
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
      //xử lý hình ảnh, nếu chưa có hình ảnh sẽ thêm trường hình ảnh vào form,ta sẽ thêm hình ảnh bằng File
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      //goi api post len server
      adminMovieApi
        .addMovie(formData)
        .then((res) => {
          // console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
  });
  const handleChangeDatapicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeFile = (e) => {
    // lấy file từ event
    const file = e.target.files[0];
    // tạo đối tượng để đọc file hiển thị ảnh
    const readFile = new FileReader();
    readFile.readAsDataURL(file);
    readFile.onload = (e) => {
      setImgSrc(e.target.result);
    };
    formik.setFieldValue("hinhAnh", file);
  };
  // tạo biến riêng để tránh sử dụng lại nhiều ảnh hưởng performance
  const errors = formik.errors;
  const touched = formik.touched;
  const values = formik.values;
  return (
    <>
      <h3>THÊM PHIM</h3>
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
          <Input name="tenPhim" onChange={formik.handleChange} />
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
          <Input name="trailer" onChange={formik.handleChange} />
          {errors.trailer && touched.trailer && (
            <div className="styleErrors">
              <p>_ Không được để trống</p>
            </div>
          )}
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} />
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
            placeholder=""
          />
          {errors.ngayKhoiChieu && touched.ngayKhoiChieu && (
            <div className="styleErrors">
              <p>_ Không được để trống</p>
            </div>
          )}
        </Form.Item>
        <Form.Item  label="Đánh giá">
          <Input style={{ width: "100px" }} name="danhGia" onChange={formik.handleChange} />
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
            type="file"
            name="hinhAnh"
            onChange={handleChangeFile}
            accept="image/jpg,image/jpeg,image/gif,image/png"
          />
          {errors.hinhAnh && touched.hinhAnh && (
            <div className="styleErrors">
              <p>_ Không được để trống</p>
            </div>
          )}
          <br />
          <img
            src={imgSrc}
            style={{ width: "150px", height: "150px" }}
            alt="..."
          />
        </Form.Item>
        <Form.Item className="text text-center">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button "
          >
            THÊM
          </Button>
          <Button
            type="primary"
            className="ml-5"
            onClick={() => {
              history.push("/admin/movie");
            }}
          >
            QUAY LẠI
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
