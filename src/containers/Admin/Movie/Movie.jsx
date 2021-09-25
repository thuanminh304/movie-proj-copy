import { React, useState, useEffect } from "react";
import adminMovieApi from "apis/adminMovieApi";
import Loader from "components/Loader/Loader";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Input, Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined,CalendarOutlined } from "@ant-design/icons";
import { actDeleteMovie } from "./module/action";
//CONTENT
export default function Movie(props) {
  let [listMovie, setListMovie] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { Search } = Input;
  const { currentUser } = useSelector((state) => state.authUserReducer);
  // gọi api tất cả phim lần đầu để render ra bảng
  useEffect(() => {
    adminMovieApi
      .getAllMovie()
      .then((res) => {
        setListMovie((listMovie = res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  //hàm xóa phim, truyền vào maPhim để xóa, sau đó render lại mảng
  const deleteMovie = (maPhim, tenPhim) => {
    if (window.confirm("Bạn có chắc muốn xóa phim " + tenPhim)) {
      //gọi action xóa phim
      dispatch(actDeleteMovie(maPhim, currentUser.accessToken));
      adminMovieApi
        .getAllMovie()
        .then((res) => {
          setListMovie((listMovie = res.data));
        })
        .catch((err) => alert(err.response?.data));
    }
  };
  const columns = [
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      sorter: {
        compare: (a, b) =>
          a.tenPhim.toLowerCase().trim() < b.tenPhim.toLowerCase().trim(),
        multiple: 3,
      },
      width: "20%",
    },
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
      sorter: {
        compare: (a, b) => a.maPhim - b.maPhim,
        multiple: 3,
      },
      width: "10%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",

      render: (text, movie) => {
        return (
          <img src={movie.hinhAnh} width={50} height={50} alt={movie.tenPhim} />
        );
      },
      width: "10%",
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",

      sorter: {
        compare: (a, b) => a.ngayKhoiChieu > b.ngayKhoiChieu,
        multiple: 3,
      },
      width: "20%",
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",

      render: (text, movie) => {
        return movie.moTa.length > 50
          ? movie.moTa.substr(0, 50) + "..."
          : movie.moTa;
      },
      width: 300,
    },
    {
      title: "Tùy chọn",
      dataIndex: "maPhim",
      key: "tuyChon",
      render: (text, movie) => {
        return (
          <div>
            <Button
              key={1}
              style={{ border: "none", color: "red" }}
              onClick={() => {
                deleteMovie(movie.maPhim, movie.tenPhim);
              }}
              icon={<DeleteOutlined />}
            ></Button>
            <Button
              key={2}
              style={{ border: "none", color: "blue" }}
              onClick={() => {
                history.push(`/admin/movie/editmovie/${movie.maPhim}`);
              }}
              icon={<EditOutlined />}
            ></Button>
            <Button
              key={3}
              onClick={() => {
                history.push(`/admin/movie/showtime/${movie.maPhim}`);
                localStorage.setItem("movieDetail", JSON.stringify(movie));
              }}
              icon={<CalendarOutlined />}
              style={{border:"none",color:'green'}}
            ></Button>
          </div>
        );
      },
      width:"15%"
    },
  ];
  const data = listMovie;
  //sau khi tìm kiếm phim bằng tên phim sẽ render lại table bằng dữ liệu lọc ra từ từ khóa
  const onSearch = (tenPhim) => {
    adminMovieApi
      .getAllMovie(tenPhim)
      .then((res) => {
        setListMovie((listMovie = res.data));
      })
      .catch((err) => console.log(err));
  };

  function onChange() {}
  //nếu listMovie khác mảng rỗng (đã call dc api từ server)thì sẽ render ra dữ liệu.
  return listMovie !== [] ? (
    <div>
      <h2>QUẢN LÝ PHIM</h2>
      <div className="d-flex my-2 ">
        <Link to="/admin/movie/addnew">
          <button
            className="btn btn-primary "
            // onClick={() => history.push("/admin/movie/addnew")}
          >
            Thêm phim
          </button>
        </Link>
        <Search
          style={{ width: "50%", marginLeft: "auto" }}
          placeholder="Nhập tên phim"
          allowClear
          enterButton
          size="large"
          onSearch={onSearch}
        />
      </div>

      <Table
        key={listMovie.maPhim}
        columns={columns}
        dataSource={data}
        onChange={onChange}
      />
    </div>
  ) : (
    <Loader />
  );
}
