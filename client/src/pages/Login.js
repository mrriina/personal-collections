import { Button, Card, Form, Input } from 'antd';
import DotLoader from "react-spinners/DotLoader";
import { Link } from "react-router-dom";
import { Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

export default function Login() {
    const onFinish = (values) => {
        console.log('Received values:', values);
    };

    return (
        <div style={{ background: "grey"}}>
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col span={6}>
                    <Card title="Login" style={{ minWidth: 300 }}>
                        <Form
                            name="login-form"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}>
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