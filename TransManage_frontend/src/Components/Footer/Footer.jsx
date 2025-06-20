import './Footer.css';
import { FacebookFilled, TwitterSquareFilled, InstagramFilled, LinkedinFilled } from '@ant-design/icons';


const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FacebookFilled /></a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><TwitterSquareFilled /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><InstagramFilled /></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><LinkedinFilled /></a>
        </div>

        <div className="footer-links">
            <a href="/about" className="footer-link">About Us</a>
            <a href="/contact" className="footer-link">Contact</a>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
        </div>

        <p style = {{ marginTop: '1rem', fontSize: '0.7rem', paddingTop: '1rem'}}>&copy; {new Date().getFullYear()} TransManage. All rights reserved.</p>

    </div>
    </div>
  );
};

export default Footer;
