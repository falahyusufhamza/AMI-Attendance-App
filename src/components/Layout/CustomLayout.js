import { Layout, message } from 'antd'
import React from 'react'
import CustomFooter from './Footer'
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import axios from 'axios';
import "./custom-layout.css";


export const CustomLayout = ({
  hasHeader = false,
  title = "",
  hasFooter = true,
  headerClassName="",
  layoutClassName="",
  hasLogout = false,
  children
}) => {

  const navigate = useNavigate();
  const logout = () => {
    axios.post('/api/signout').then((response) => {
      if (response?.data?.success === true) {
      localStorage.removeItem('name');
      localStorage.removeItem('id');
      document.cookie= '';
      navigate('/login');
      message.success('Logged out successfully!');
      } else {
        message.error('Logout failed!');
      }
    }).catch(error => {
      console.error('Logout error:', error);
    });
  }

  return (
    <Layout className='layout-container'>
      {hasHeader && <Layout.Header className={headerClassName} style={{ background: "white" }}>
        <h1 className='header-title'>{title}</h1>
        {hasLogout && <div className='logout'>
          <LogoutOutlined className='logout-icon' onClick={logout}/>
        </div>}
      </Layout.Header>}
      <Layout.Content className={layoutClassName} >
        {children}
        </Layout.Content>
      {hasFooter && <CustomFooter />}
    </Layout>
  )
}