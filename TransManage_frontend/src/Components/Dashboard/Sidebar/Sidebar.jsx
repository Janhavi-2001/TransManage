import { Link } from 'react-router-dom';
import { SolutionOutlined, TranslationOutlined, ProjectOutlined} from '@ant-design/icons';
import './Sidebar.css';
import { useState } from 'react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '☰' : '✕'}
      </button>
      <nav style={{ display: collapsed ? '' : 'flex' }}>
        <Link to="/dashboard"><span className="sidebar-item"><SolutionOutlined />&nbsp;&nbsp;Overview</span></Link>
        <Link to="/projects"><span className="sidebar-item"><ProjectOutlined />&nbsp;&nbsp;Projects</span></Link>
        <Link to="/translations"><span className="sidebar-item"><TranslationOutlined />&nbsp;&nbsp;Translations</span></Link>
      </nav>
    </div>
  );
};

export default Sidebar;
