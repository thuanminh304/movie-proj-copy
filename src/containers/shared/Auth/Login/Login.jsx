import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link,useHistory,Redirect } from "react-router-dom";
import { useDispatch ,useSelector} from "react-redux";
import { actLoginUser } from "./module/action";
import Loader from "components/Loader/Loader";

export default function Login() {
  const dispatch = useDispatch();
  const history=useHistory()
  const { currentUser, loading, err } = useSelector(
    (state) => state.authUserReducer
  );
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(actLoginUser(values,history));

  };
  if (loading) return <Loader />;
  return !currentUser ? (
    <>
      <h2>LOG IN</h2>
      {err && <div className="text text-danger">{err}</div>}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="taiKhoan"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
          style={{ width: "500px", margin: "0 auto" }}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="matKhau"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
          style={{ width: "500px", margin: "1rem auto" }}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/">register now!</Link>
        </Form.Item>
      </Form>
    </>
  ):(<Redirect to="/"/>)
}
