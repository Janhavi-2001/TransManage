import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import Topbar from './Topbar/Topbar';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="dashboard-widgets">
          <div className="widget">Total Strings: 1200</div>
          <div className="widget">Languages: 5</div>
          <div className="widget">Pending: 47</div>
          <div className="widget">Last Update: 2025-06-11</div>
        </div>
        <div className="dashboard-sections">
          <div className="section">
            <h3>Recent Projects</h3>
            <ul>
              <li>Mobile App Translation</li>
              <li>Website Revamp</li>
            </ul>
          </div>
          <div className="section">
            <h3>Pending Translations</h3>
            <ul>
              <li>Home.title (fr)</li>
              <li>Login.button (de)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
