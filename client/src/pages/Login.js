import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Button, Card, Form, Input, Row, Col, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { login } from '../http/userAPI';
import { REGISTRATION_ROUTE, PROFILE_ROUTE } from './utils/routes'

export default function Login() {
    const { t } = useTranslation();
    let navigate = useNavigate();
    
    const loginHandler = async (values) => {
        try {
            await login(values.email, values.password);
            navigate(PROFILE_ROUTE);
        } catch (e) {
            message.error(t('auth.user_not_found'))
        }
    };

    return (
        <div>
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col span={6}>
                    <Card title={<h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>{t('navbar.login')}</h2>} style={{ minWidth: 300 }}>
                        <Form
                            name="login-form"
                            initialValues={{ remember: true }}
                            onFinish={loginHandler}>
                            <Form.Item
                                name="email"
                                rules={[
                                    { type: 'email', message: t('auth.rule_email') },
                                    { required: true, message: t('auth.rule_required') },
                                ]}>
                                <Input prefix={<MailOutlined />} placeholder={t('auth.email')} />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: t('auth.rule_required') }]}>
                                <Input.Password prefix={<LockOutlined />} placeholder={t('auth.password')} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                    {t('auth.log_in')}
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                {t('auth.dont_have_an_account')}? <Link to={REGISTRATION_ROUTE}>{t('auth.register')}</Link>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}