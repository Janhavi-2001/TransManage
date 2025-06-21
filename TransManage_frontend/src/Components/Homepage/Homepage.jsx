import './Homepage.css';
import homeImage from '../../assets/images/homeimage.png';
import { useState } from 'react';

function Homepage() {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
      <div className="homepage">
        <div className="homepage-content">
          <h1>Your one-stop solution for all translation management needs.</h1>
          <p>Streamline your translation workflow and enhance collaboration with our powerful tool today.</p>
          <a href="/login" className="login-link">Try It Now</a>
          <a href="/" className="demo-link">View Demo</a>
        </div>
        <img
          src={homeImage}
          alt="TransManage"
          className={imgLoaded ? 'loaded' : ''}
          onLoad={() => setImgLoaded(true)}
        />
      </div>
  );
}

export default Homepage;
