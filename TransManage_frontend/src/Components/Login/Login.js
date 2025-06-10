import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import './Login.css';
import { MailOutlined, KeyOutlined } from '@ant-design/icons';

const Login = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        message.success('Login attempted!');
    };
    
    return (
        <>
            <div className="login-page">
            <div className="login-container">
                <h2>Log In To Your Account</h2>
                <br></br>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    className="login-form"
                    layout="vertical">
                    
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                        className = "login-form-item">
                        <Input type="email" placeholder="Enter your email" size='large' prefix={<MailOutlined />}/>
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        className = "login-form-item">
                        <Input.Password placeholder="Enter your password" size='large' prefix={<KeyOutlined />}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className="user-login-button">
                            Log In
                        </Button>
                    </Form.Item>
                    <div className='forgot-password-link'><a href="/reset-password" style={{ color: '#1890ff' }}>Forgot your password?</a></div>
                </Form>
            </div>
            <div className="login-footer">
                <p>Don't have an account? <a href="/register">Sign Up</a></p>
            </div>
            </div>
        </>
);
};

export default Login;