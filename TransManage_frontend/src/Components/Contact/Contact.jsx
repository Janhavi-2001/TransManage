import { Form, Input, Button } from 'antd';
import contactImage from '../../assets/images/contact.jpg';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-content">
            <div className="contact-left">
                <div className="contact-image">
                    <img src={contactImage} alt="Contact Us" height="400" width="400" />
                </div>
                
                <div className="contact-cards">
                    <div className="contact-card">
                        <h3>Email Us</h3>
                        <p>For any inquiries, please email us at:</p>
                        <a href="mailto:info@transmanage.com">info@transmanage.com</a>
                    </div>
                    
                    <div className="contact-card">
                        <h3>Call Us</h3>
                        <p>Speak with our team directly:</p>
                        <a href="tel:+1234567890">+1 (234) 567-890</a>
                    </div>
                    
                    <div className="contact-card">
                        <h3>Office Hours</h3>
                        <p>Monday - Friday</p>
                        <span>9:00 AM - 6:00 PM EST</span>
                    </div>
                    
                    <div className="contact-card">
                        <h3>Address</h3>
                        <p>123 Translation Street<br/>
                        Suite 100<br/>
                        Language City, LC 12345</p>
                    </div>
                </div>
            </div>
            
            <div className="contact-right">
                <div className="contact-form-section">
                    <h1>Contact Us Today.</h1>
                    <p>If you have any questions or need assistance with your translation projects, please feel free to reach out to us.</p>
                    <Form layout="vertical" className="contact-form">
                        <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter your first name' }]}>
                            <Input placeholder="Your First Name" />
                        </Form.Item>
                        <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
                            <Input placeholder="Your Last Name" />
                        </Form.Item>
                        <Form.Item label="Organization Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}>
                            <Input placeholder="Your Organization Email" />
                        </Form.Item>
                        <Form.Item label="Subject" name="subject" rules={[{ required: true, message: 'Please enter the subject' }]}>
                            <Input placeholder="Subject" />
                        </Form.Item>
                        <Form.Item label="Message" name="message" rules={[{ required: true, message: 'Please enter your message' }]}>
                            <Input.TextArea rows={2} placeholder="Your Message" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="submit-button">
                                Send Message
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
