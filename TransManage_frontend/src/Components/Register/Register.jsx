import { useState } from 'react';
import { Button, Form, Input, message, Row, Col, Modal } from 'antd';
import './Register.css';
import { UserOutlined, MailOutlined, KeyOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/registerAPI';


const Register = () => {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { firstName, lastName, username, email, password, confirmPassword } = values;

        if (password !== confirmPassword) {
            message.error('Passwords do not match!');
            return;
        }

        setLoading(true);
        try {
            const responseMessage = await registerUser({ firstName, lastName, username, email, password });
            message.success(responseMessage);
            form.resetFields()
            setIsModalVisible(true);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
        navigate('/login');
    };
    
    return (
        <>
            <div className="register-page">
            <div className="register-container">
                <h2>Create Your Account</h2>
                <br></br>
                <Form
                    form={form}
                    name="register"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    className="register-form"
                    layout="vertical">

                    <Row gutter={0}>
                    <Col span={12}>
                        <Form.Item
                        name="firstName"
                        className="register-form-item"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your first name!',
                            },
                        ]}
                        >
                        <Input placeholder="First name" size='large' prefix={<UserOutlined />}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                        name="lastName"
                        className="register-form-item"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your last name!',
                            },
                        ]}
                        >
                        <Input placeholder="Last name" size='large' prefix={<UserOutlined />}/>
                        </Form.Item>
                    </Col>
                    </Row>
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
            <Modal
                title="Registration Successful"
                open={isModalVisible}
                onOk={handleModalOk}
                footer={[
                    <Button key="ok" type="success" onClick={handleModalOk}>
                        Continue to Login
                    </Button>
                ]}
                centered
                width={400}
            >
                <div className="register-success-modal">
                    <div style={{ textAlign: 'center' }}>
                        <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                        <h2 style={{ color: '#52c41a', marginBottom: '16px' }}>Registration Successful!</h2>
                        <p style={{ color: '#666', fontSize: '16px' }}>
                            Your account has been created successfully. You can now log in with your credentials.
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Register;