import React from 'react';
import { Link } from 'react-router-dom';
import { SolutionOutlined, TranslationOutlined, ProjectOutlined, SettingOutlined, PoweroffOutlined } from '@ant-design/icons';
import './Sidebar.css';
import { useState } from 'react';

// const Sidebar = () => (
//   <div className="sidebar">
//     <nav>
//       <Link to="/dashboard"><span className="sidebar-item"><SolutionOutlined />&nbsp;&nbsp;Dashboard</span></Link>
//       <Link to="/translations"><span className="sidebar-item"><TranslationOutlined />&nbsp;&nbsp;Translations</span></Link>
//       <Link to="/projects"><span className="sidebar-item"><ProjectOutlined />&nbsp;&nbsp;Projects</span></Link>
//       <Link to="/settings"><span className="sidebar-item"><SettingOutlined />&nbsp;&nbsp;Settings</span></Link>
//       <Link to="/logout"><span className="sidebar-item"><PoweroffOutlined />&nbsp;&nbsp;Logout</span></Link>
//     </nav>
//   </div>
// );



const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '☰' : '✕'}
      </button>
      <nav style={{ display: collapsed ? '' : 'flex' }}>
        <Link to="/dashboard"><span className="sidebar-item"><SolutionOutlined />&nbsp;&nbsp;Dashboard</span></Link>
        <Link to="/projects"><span className="sidebar-item"><ProjectOutlined />&nbsp;&nbsp;Projects</span></Link>
        <Link to="/translations"><span className="sidebar-item"><TranslationOutlined />&nbsp;&nbsp;Translations</span></Link>
        <Link to="/settings"><span className="sidebar-item"><SettingOutlined />&nbsp;&nbsp;Settings</span></Link>
        <Link to="/logout"><span className="sidebar-item"><PoweroffOutlined />&nbsp;&nbsp;Logout</span></Link>
      </nav>
    </div>
  );
};

export default Sidebar;
