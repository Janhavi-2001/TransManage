import './Homepage.css';
import image from './homeimage.jpg';

function Homepage() {
  return (
    <div className="container">
      <div className="homepage">
        <div className="homepage-content">
          <h1>Your one-stop solution for all translation management needs.</h1>
          <p>Streamline your translation workflow and enhance collaboration with our powerful tool today.</p>
          <a href="/login" className="login-link">Try It Now</a>
          <a href="/" className="demo-link">View Demo</a>
        </div>
        <img src={image} alt="TransManage" />
      </div>
    </div>
  );
}

export default Homepage;
