import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, Row, Col } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import DotLoader from "react-spinners/DotLoader";
import { login } from '../http/userAPI';

export default function Login() {
    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    
    const loginHandler = async (values) => {
        try {
            await login(values.email, values.password);
            setErrorMessage(null);
            navigate("/");
        } catch (e) {
            setErrorMessage(e.response.data.message);
        }
    };

    return (
        <div style={{ background: "grey"}}>
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col span={6}>
                    <Card title={<h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>Login</h2>} style={{ minWidth: 300 }}>
                        <Form
                            name="login-form"
                            initialValues={{ remember: true }}
                            onFinish={loginHandler}>
                                {errorMessage && (
                                    <div style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</div>
                                )}
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
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    Log In
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                Don't have an account? <Link to="/registration">Register</Link>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}