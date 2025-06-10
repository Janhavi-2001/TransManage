import './Homepage.css';
import image from './homeimage.jpg';
import { useState } from 'react';

function Homepage() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="container">
      <div className="homepage">
        <div className="homepage-content">
          <h1>Your one-stop solution for all translation management needs.</h1>
          <p>Streamline your translation workflow and enhance collaboration with our powerful tool today.</p>
          <a href="/login" className="login-link">Try It Now</a>
          <a href="/" className="demo-link">View Demo</a>
        </div>
        <img
          src={image}
          alt="TransManage"
          className={imgLoaded ? 'loaded' : ''}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
    </div>
  );
}

export default Homepage;
