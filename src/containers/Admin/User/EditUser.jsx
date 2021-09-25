import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useFormik } from "formik";
import { GROUP_ID } from "settings/apiConfig";
import userApi from "apis/userApi";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import "./User.scss";
//CONTENT
export default function EditUser() {
  let [inforDetailUser, setInforDetailUser] = useState("");

  const history = useHistory();
  const { currentUser } = useSelector((state) => state.authUserReducer);
  const params = useParams();
  useEffect(() => {
    userApi
      .getInforDetailUser(params.taiKhoan)
      .then((res) => {
        // vì thông tin tài khoản api trả về là 1 mảg với duy nhất 1 obj nên phải dùn [0] lấy obj đầu tiên là thong itn người dùng
        setInforDetailUser((inforDetailUser = res.data[0]));
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  }, []);
  //tạo form để chưa thông tin người dùng để cập nhật
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: inforDetailUser.taiKhoan,
      matKhau: inforDetailUser.matKhau,
      email: inforDetailUser.email,
      soDt: inforDetailUser.soDt,
      maNhom: GROUP_ID,
      maLoaiNguoiDung: inforDetailUser.maLoaiNguoiDung,
      hoTen: inforDetailUser.hoTen,
    },
    validationSchema: yup.object({
      taiKhoan: yup.string().matches(/^\w+$/).required(),
      matKhau: yup
        .string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/)
        .required(),
      email: yup.string().email().required("Email không đúng định dạng"),
      soDt: yup
        .string()
        .matches(/^[0-9]*$/)
        .max(10)
        .required("Số điện thoại chưa đúng định dạng !"),
      maNhom: yup.string(),
      maLoaiNguoiDung: yup.string().required("Bạn chưa chọn loại người dùng !"),
      hoTen: yup
        .string()
        .matches(
          /^[a-zA-ZàáăắằẳẵặâầấẩẫậäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/
        )
        .required(),
    }),
    onSubmit: (values) => {
      console.log("values",values)
      userApi
        .editUser(values, currentUser.accessToken)
        .then((res) => {
          alert("Cập nhật thành công !");
          history.push("/admin/user");
        })
        .catch((err) => {
          console.log(err.response?.data);
        });
    },
  });
  const handleChangeLoaiNguoiDung = (value) => {
    console.log(value);
    formik.setFieldValue("maLoaiNguoiDung", value);
  };
  // tạo biến riêng để tránh sử dụng lại nhiều ảnh hưởng performance
  const errors = formik.errors;
  const touched = formik.touched;
  const values = formik.values;
  return (
    <>
      <h2>Cập nhật thông tin</h2>
      <Form
      className="text-left"
        onSubmitCapture={formik.handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
      >
        <Form.Item label="Tài khoản">
          <Input
            disabled
            name="taiKhoan"
            onChange={formik.handleChange}
            value={formik.values.taiKhoan}
          />
          {errors.taiKhoan &&
            touched.taiKhoan &&
            (values.taiKhoan === "" ? (
              <div className="styleErrors">
                <p>_ Không được để trống</p>
                <p>_ Không sử dụng dấu câu và các ký tự đặc biệt</p>
              </div>
            ) : (
              <div className="styleErrors">
                <p>_ Không sử dụng dấu câu và các ký tự đặc biệt</p>
              </div>
            ))}
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input
            name="matKhau"
            onChange={formik.handleChange}
            value={formik.values.matKhau}
          />
          {errors.matKhau &&
            touched.matKhau &&
            (values.matKhau.length < 6 || values.matKhau.length > 10 ? (
              <div className="styleErrors">
                <p>_ Độ dài ký tự từ 6 đến 10</p>
                <p>_ Không sử dụng kí tự đặc biệt</p>
                <p>_ Ít nhất 1 kí tự thường , hoa và chữ số</p>
              </div>
            ) : (
              <div className="styleErrors">
                <p>_ Không sử dụng kí tự đặc biệt</p>
                <p>_ Ít nhất 1 kí tự thường , hoa và chữ số</p>
              </div>
            ))}
        </Form.Item>
        <Form.Item label="Họ tên">
          <Input
            name="hoTen"
            onChange={formik.handleChange}
            value={formik.values.hoTen}
          />
          {errors.hoTen &&
            touched.hoTen &&
            (values.hoTen === "" ? (
              <div  className="styleErrors">
                <p>_ Không được để trống</p>
                <p>_ Không chứa các kí tự đặc biệt và dấu câu</p>
              </div>
            ) : (
              <div className="styleErrors">
                <p>_ Không chứa các kí tự đặc biệt và dấu câu</p>
              </div>
            ))}
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            name="soDt"
            onChange={formik.handleChange}
            value={formik.values.soDt}
          />
          {errors.soDt &&
            touched.soDt &&
            (values.soDt === "" ? (
              <div className="styleErrors">
                <p>_ Không được để trống</p>
                <p>_ Số điện thoại không đúng định dạng</p>
              </div>
            ) : (
              <div className="styleErrors">
                <p>_ Số điện thoại không đúng định dạng</p>
              </div>
            ))}
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />{" "}
          {errors.email &&
            touched.email &&
            (values.email === "" ? (
              <div className="styleErrors">
                <p>_ Không được để trống</p>
                <p>_ Email không đúng định dạng(ex: abc@gmail.com)</p>
              </div>
            ) : (
              <div className="styleErrors">
                <p>_ Email không đúng định dạng(ex: abc@gmail.com)</p>
              </div>
            ))}
        </Form.Item>
        <Form.Item label="Loại người dùng">
          <Select
            name="maLoaiNguoiDung"
            options={[
              { label: "Quản Trị", value: "QuanTri" },
              { label: "Khách hàng", value: "KhachHang" },
            ]}
            onChange={handleChangeLoaiNguoiDung}
            placeholder="Chọn loại người dùng"
            value={formik.values.maLoaiNguoiDung}
          />
        </Form.Item>

        <Form.Item style={{ marginLeft: "307px" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button "
          >
            Cập nhật
          </Button>
          <NavLink to="/admin/user">
            <Button type="primary" className="login-form-button ml-5">
              Quay lại
            </Button>
          </NavLink>
        </Form.Item>
      </Form>
    </>
  );
}
