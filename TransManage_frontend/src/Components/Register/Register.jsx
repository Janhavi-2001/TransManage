import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import './Register.css';
import { UserOutlined, MailOutlined, KeyOutlined } from '@ant-design/icons';

const Register = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        message.success('Registration attempted!');
    };
    
    return (
        <>
            <div className="register-page">
            <div className="register-container">
                <h2>Create Your Account</h2>
                <br></br>
                <Form
                    name="register"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    className="register-form"
                    layout="vertical">
                    
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                        className = "register-form-item">
                        <Input placeholder="Enter your username" size='large' prefix={<UserOutlined />}/>
                    </Form.Item>
                    
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                        className = "register-form-item">
                        <Input type="email" placeholder="Enter your email" size='large' prefix={<MailOutlined />}/>
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                        className = "register-form-item">
                        <Input.Password placeholder="Enter your password" size='large' prefix={<KeyOutlined />}/>
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        rules ={[{ required: true, message: 'Please confirm your password!' }]}
                        className = "register-form-item">
                        <Input.Password placeholder="Confirm your password" size='large' prefix={<KeyOutlined />}/>
                    </Form.Item>
                    
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className="user-register-button">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="register-footer">
                <p>Already have an account? <a href="/login">Log In</a></p>
            </div>
            </div>
        </>
);
};

export default Register;