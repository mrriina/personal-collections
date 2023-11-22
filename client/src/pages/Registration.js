import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Row, Col, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { registration } from '../http/userAPI';
import { useTranslation } from 'react-i18next';

const Registration = () => {
    const { t } = useTranslation();
    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

  const registrationHandler = async (values) => {
    try {
        await registration(values.name, values.email, values.password);
        message.success(t('auth.successfully_registered'))
        setErrorMessage(null)
        navigate("/profile");
    } catch (e) {
        setErrorMessage(e.response.data.message)
    }
  };

  return (
    <div>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col span={6}>
                <Card title={<h2 style={{ textAlign: 'center', fontSize: '1.5rem' }}>{t('auth.register')}</h2>} style={{ minWidth: 300 }}>
                    <Form
                        name="register-form"
                        onFinish={registrationHandler}
                    >
                        {errorMessage && (
                            <div style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</div>
                        )}
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: t('auth.rule_required') }]}>
                            <Input prefix={<UserOutlined />} placeholder={t('auth.name')} />
                        </Form.Item>
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
                        <Form.Item
                            name="confirmPassword"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: t('auth.rule_confirm_password'),
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                        }
                                        return Promise.reject(new Error(t('auth.rule_passwords_match')));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder={t('auth.confirm_password')} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                {t('auth.register')}
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            {t('auth.already_have_an_account')}? <Link to="/login">{t('auth.log_in')}</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    </div>
  );
};

export default Registration;