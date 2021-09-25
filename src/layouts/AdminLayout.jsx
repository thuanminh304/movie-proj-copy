import React from "react";
import withLayout from "hocs/withLayout";
import { Layout, Menu } from "antd";
import {
  
  TeamOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;


function AdminLayout(props) {
  const { currentUser } = useSelector((state) => state.authUserReducer);
  return currentUser ? (
    currentUser.maLoaiNguoiDung === "QuanTri" ? (
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <div className="logo">
            <img
              src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-movie-board-icon-png-image_4751062.jpg"
              width="60px"
              alt=""
            />
          </div>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<TeamOutlined />}>
              <Link to="/admin/user">User</Link>
            </Menu.Item>

            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <Link to="/admin/movie">Movie</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Link to="/">
              <button className="btn btn-success">HOME</button>
            </Link>
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, textAlign: "center" }}
            >
              {/* noji dung */}
              {props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>PHIM MOVIE PROJECT</Footer>
        </Layout>
      </Layout>
    ) : (
      <Redirect to="/" />
    )
  ) : (
    <Redirect to="/login" />
  );
}

export default withLayout(AdminLayout);
