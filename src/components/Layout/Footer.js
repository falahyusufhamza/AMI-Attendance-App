import { Col, Layout, Row } from 'antd'
import React from 'react'
import { NavLink } from 'react-router'
import { HomeOutlined, PlusCircleFilled, UserOutlined } from '@ant-design/icons';


const CustomFooter = () => {
  return (
    <Layout.Footer 
      className='footer-footy'
      style={{
          position: 'fixed',
          bottom: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Row style={{width: '100%', textAlign: 'center'} }>
            <Col span={12} className='footer-col'>
              <NavLink className={({ isActive }) =>
          isActive ? "active" : ""
        } to="/"><HomeOutlined size={40}/></NavLink>
            </Col>
            <Col span={12} className='footer-col'>
              <NavLink className={({ isActive }) =>
          isActive ? "active" : ""
        } to="/user" ><UserOutlined/></NavLink>
            </Col>
          </Row>


        </Layout.Footer>
  )
}

export default CustomFooter;