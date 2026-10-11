import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import './Login.css';
import { MailOutlined, KeyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/loginAPI';
import Loader from '../Loader/Loader';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [redirecting, setRedirecting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { email, password } = values;

        if (!email || !password) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            await loginUser({ email, password });
            form.resetFields();
            setRedirecting(true);
            setLoading(false);
            navigate('/dashboard');

        } catch (error) {
            setErrorMessage(error.message || 'Unable to log in.');
            setLoading(false);
        }
    };

    if (redirecting) {
        return <Loader />;
    }
    
    return (
        <>
            <div className="login-page">
            <div className="login-container">
                <h2>Log In To Your Account</h2>
                <br></br>
                <Form
                    form={form}
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
            <Modal
                title="Unable to log in"
                open={Boolean(errorMessage)}
                onOk={() => setErrorMessage('')}
                onCancel={() => setErrorMessage('')}
                okText="Close"
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <p>{errorMessage}</p>
            </Modal>
        </>
);
};

export default Login;