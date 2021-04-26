import React from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Layout,
} from 'antd';

import './styles.css';
import useHooks from 'hooks/useAuthentication';

const { Header, Footer, Content } = Layout;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function Authentication() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const {
    state: {
      userName,
      password,
    },
    handler: {
      setUsername,
      setPassword,
      handleLogin,
    }
  } = useHooks();

  // set title
  React.useEffect(() => document.title = 'Welcome', []);

  return (
    <Layout>
      <Header></Header>
      <Content>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input
              value={userName}
              onChange={(evt) => setUsername(evt.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleLogin}
            >
              Login
        </Button>
          </Form.Item>
        </Form>
      </Content>
      <Footer></Footer>
    </Layout>
  );
}