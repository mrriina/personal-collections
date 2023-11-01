import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Row, Col, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { registration } from '../http/userAPI';

const Registration = () => {
    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

  const registrationHandler = async (values) => {
    try {
        await registration(values.name, values.email, values.password);
        message.success("Successfully registered!")
        setErrorMessage(null)
        navigate("/profile");
    } catch (e) {
        setErrorMessage(e.response.data.message)
    }
  };

  return (
    <div style={{ background: "grey"}}>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={6}>
                <Card title={<h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>Register</h2>} style={{ minWidth: 300 }}>
                    <Form
                        name="register-form"
                        onFinish={registrationHandler}
                    >
                        {errorMessage && (
                            <div style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</div>
                        )}
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}>
                            <Input prefix={<UserOutlined />} placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                { type: 'email', message: 'The input is not a valid email!' },
                                { required: true, message: 'Please input your email!' },
                            ]}>
                            <Input prefix={<MailOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="confirmPassword"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Register
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            Already have an account? <Link to="/login">Log In</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    </div>
  );
};

export default Registration;