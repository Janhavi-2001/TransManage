import Homepage from './Components/Homepage/Homepage';
import Navbar from './Components/Navbar/Navbar';
import './App.css';

function App() {
  return (
  <div className="App">
    <div className="container">
      <Navbar />
        <Homepage />
    </div>
  </div>
);
}

export default App;