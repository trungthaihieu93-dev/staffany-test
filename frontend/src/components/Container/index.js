import React, { useCallback } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  ScheduleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { JWT } from 'constants/env';
import { routes } from 'constants/routes';

import styles from './styles.css';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

export default function Container({ title, children }) {
  const history = useHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => document.title = title, []);

  const handleLogout = useCallback(() => {
    window.localStorage.setItem(JWT, null);
    alert('Logged out!');
    history.replace('/');
  }, [history]);

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={Object.keys(routes).filter((key) => routes[key] === history.location.pathname)}
        >
          <Menu.Item key="home">
            <Link to={routes.home}>Home</Link>
          </Menu.Item>
          <Menu.Item key="shifts">
            <Link to={routes.shifts}>Shifts</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="employees" icon={<UserOutlined />} title="Employees">
                <Menu.Item key="Jobs">Jobs</Menu.Item>
                <Menu.Item key="Departures">Departures</Menu.Item>
                <Menu.Item key="Rooms">Rooms</Menu.Item>
                <Menu.Item key="Services">Services</Menu.Item>
              </SubMenu>
              <SubMenu key="employees" icon={<ScheduleOutlined />} title="Schedules">
                <Menu.Item key="1">Days</Menu.Item>
                <Menu.Item key="2">Weeks</Menu.Item>
                <Menu.Item key="3">Months</Menu.Item>
                <Menu.Item key="4">Years</Menu.Item>
              </SubMenu>
              <SubMenu
                title="Logout"
                key="logout"
                icon={<LogoutOutlined />}
                onTitleClick={handleLogout}
              >
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: '80vh' }}>
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Powered by Tony</Footer>
      <ToastContainer
        position="bottom-center"
      />
    </Layout>
  )
}