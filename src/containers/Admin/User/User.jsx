import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Table, Tag, Space, Input, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { actGetAllUser } from "./module/action";
import userApi from "apis/userApi";

export default function User() {
  const { Search } = Input;
  const dispatch = useDispatch();
  const { listAllUser } = useSelector((state) => state.allUserReducer);
  const { currentUser } = useSelector((state) => state.authUserReducer);
  //lấy api user lần ddaauf để render
  useEffect(() => {
    dispatch(actGetAllUser());
  }, []);
  // hàm xóa người dùng
  const deleteUser = (taiKhoan) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này chứ ?")) {
      userApi
        .deleteUser(taiKhoan, currentUser.accessToken)
        .then((res) => {
          alert("Xóa thành công !");

          dispatch(actGetAllUser());
        })
        .catch((err) => {
          alert(err.response?.data);
        });
    }
  };
  // dữ liệu cho bảng
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      render: (text) => <a>{text}</a>,
      width: "15%",
      sorter: {
        compare: (a, b) =>
          a.taiKhoan.toLowerCase().trim() > b.taiKhoan.toLowerCase().trim(),
        multiple: 3,
      },
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: "20%",
      sorter: {
        compare: (a, b) =>
          a.hoTen.toLowerCase().trim() > b.hoTen.toLowerCase().trim(),
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "22%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
      width: "13%",
    },
    {
      title: "Loại người dùng",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
      render: (text, user) => {
        let color = user.maLoaiNguoiDung === "QuanTri" ? "volcano" : "green";
        let params =
          user.maLoaiNguoiDung === "QuanTri" ? "Quản Trị" : "Khách hàng";

        return (
          <Tag color={color} key={user.maLoaiNguoiDung}>
            {params.toUpperCase()}
          </Tag>
        );
      },
      width: "15%",
      filters: [
        {
          text: "QuanTri",
          value: "QuanTri",
        },
        {
          text: "KhachHang",
          value: "KhachHang",
        },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Tùy chọn",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              deleteUser(record.taiKhoan);
            }}
            icon={<DeleteOutlined />}
            style={{ border: "none", color: "red" }}
          ></Button>

          <NavLink to={`/admin/user/edituser/${record.taiKhoan}`}>
            <Button
              icon={<EditOutlined />}
              style={{ border: "none", color: "blue" }}
            ></Button>
          </NavLink>
        </Space>
      ),
      width: "15%",
    },
  ];

  const data = listAllUser;
  // hàm tìm kiếm user
  const onSearch = (value) => {
//sau khi tìm kiếm sẽ trả về mảng với value tương ứng
    dispatch(actGetAllUser(value));
  };

  return (
    <>
      <h2>QUẢN LÝ NGƯỜI DÙNG</h2>
      <div className="d-flex my-3">
        <Link to="/admin/user/adduser">
          <button className="btn btn-primary">Thêm</button>
        </Link>
        <Search
          style={{ width: "50%", marginLeft: "auto" }}
          placeholder="Nhập từ khóa"
          onSearch={onSearch}
          size="large"
          enterButton
          allowClear
        />
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
