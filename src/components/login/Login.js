import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useUserContext } from '../../UserContext';

const { Title } = Typography;

export const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const {setUser} = useUserContext();

  const onSignIn = (values) => {
    // Replace with real login logic
    const { userName, password } = values;
    axios.post('/signin', { userName, password }).then(response => {
      if (response?.status === 200) {
        localStorage.setItem('name',response?.data?.name);
        localStorage.setItem('id',response?.data?.userId);
        localStorage.setItem('authToken',response?.data?.token);
        // document.cookie = `authToken=${response?.data?.token}; path=/; max-age=3600;`;
        navigate('/');
      } else {
        message.error('Login failed: ' + response);
      }
    }).catch(error => {
      console.error('Login error:', error);
      message.error(error?.response?.data?.message ?? 'An error occurred while logging in. Please try again.');
    });
  };
  const onSignUp = (values) => {
    // Replace with real login logic
    const { userName, password } = values;
    axios.post('/create-user', { userName, password }).then(response => {
      if (response?.status === 200) {
        onSignIn (values);
      } else {
        message.error('Login failed: ' + response);
      }
    }).catch(error => {
      console.error('Login error:', error);
      message.error('An error occurred while logging in. Please try again.');
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f2f5',
      }}
    >
      {isLogin ? <Card
        style={{ width: 400, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      >
        <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
          AMI Hadhoor Login
        </Title>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onSignIn}
          layout="vertical"
        >
          <Form.Item
            name="userName"
            label="userName"
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType='submit' block>
              Log In
            </Button>
          </Form.Item>
        </Form>
        <Button type="link" onClick={() => setIsLogin(false)} block>
          Don't have an account? Sign Up   
        </Button>
      </Card> : 
      <Card
      style={{ width: 400, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
    >
      <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
        AMI Hadhoor Signup
      </Title>

      <Form
        name="signup"
        initialValues={{ remember: true }}
        onFinish={onSignUp}
        layout="vertical"
      >
        <Form.Item
          name="userName"
          label="userName"
          rules={[
            { required: true, message: 'Please input your username!' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Enter your username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType='submit' block>
            Sign Up
          </Button>
        </Form.Item>
      </Form>
        <Button type="link" onClick={() => setIsLogin(true)} block>
            Already have an account? Log In 
        </Button>
    </Card>
      
      }
    </div>
  );
};

