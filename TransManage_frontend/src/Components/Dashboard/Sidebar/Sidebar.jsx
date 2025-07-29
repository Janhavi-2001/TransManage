import { Link } from 'react-router-dom';
import { SolutionOutlined, TranslationOutlined, ProjectOutlined } from '@ant-design/icons';
import './Sidebar.css';
import { useState, useEffect } from 'react';
import { getProjects } from '../../../api/projectsApi';
import { getPages } from '../../../api/pagesApi';
import { getTranslationKeys } from '../../../api/translationkeysApi';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [showProjects, setShowProjects] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState(new Set());
  const [expandedPages, setExpandedPages] = useState(new Set());
  const [projectPages, setProjectPages] = useState({});
  const [pageKeys, setPageKeys] = useState({});
  const [loadingPages, setLoadingPages] = useState({});
  const [loadingKeys, setLoadingKeys] = useState({});

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const projectsData = await getProjects();
      setProjects(projectsData || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const loadPages = async (projectId) => {
    setLoadingPages(prev => ({ ...prev, [projectId]: true }));
    try {
      const pagesData = await getPages(projectId);
      setProjectPages(prev => ({
        ...prev,
        [projectId]: pagesData || []
      }));
    } catch (error) {
      console.error('Error loading pages:', error);
      setProjectPages(prev => ({
        ...prev,
        [projectId]: []
      }));
    } finally {
      setLoadingPages(prev => ({ ...prev, [projectId]: false }));
    }
  };

  const loadTranslationKeys = async (projectId, pageId) => {
    const pageKey = `${projectId}-${pageId}`;
    setLoadingKeys(prev => ({ ...prev, [pageKey]: true }));
    try {
      const keysData = await getTranslationKeys(projectId, pageId);
      setPageKeys(prev => ({
        ...prev,
        [pageKey]: keysData || []
      }));
    } catch (error) {
      console.error('Error loading keys:', error);
      setPageKeys(prev => ({
        ...prev,
        [pageKey]: []
      }));
    } finally {
      setLoadingKeys(prev => ({ ...prev, [pageKey]: false }));
    }
  };

  const toggleProject = async (projectId) => {
    const newExpanded = new Set(expandedProjects);
    if (expandedProjects.has(projectId)) {
      newExpanded.delete(projectId);
    } else {
      newExpanded.add(projectId);
      if (!projectPages[projectId]) {
        await loadPages(projectId);
      }
    }
    setExpandedProjects(newExpanded);
  };

  const togglePage = async (projectId, pageId) => {
    const pageKey = `${projectId}-${pageId}`;
    const newExpanded = new Set(expandedPages);
    if (expandedPages.has(pageKey)) {
      newExpanded.delete(pageKey);
    } else {
      newExpanded.add(pageKey);
      if (!pageKeys[pageKey]) {
        await loadTranslationKeys(projectId, pageId);
      }
    }
    setExpandedPages(newExpanded);
  };

  const toggleProjects = () => {
    setShowProjects(!showProjects);
    if (!showProjects && projects.length === 0) {
      loadProjects();
    }
  };

  return (
    <div className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '☰' : '✕'}
      </button>
      
      <nav style={{ display: collapsed ? '' : 'flex' }}>
        <Link to="/dashboard">
          <span className="sidebar-item"><SolutionOutlined />&nbsp;&nbsp;Overview</span>
        </Link>

        {/* Projects */}
        <div>
          <div className="sidebar-item" onClick={toggleProjects}>
            <ProjectOutlined />&nbsp;&nbsp;Projects {showProjects ? '⬆️' : '⬇️'}
            {loading && <span>&nbsp;⏳</span>}
          </div>
          {showProjects && (
            <div className="nested-menu">
              <Link to="/projects">
                <div className="sidebar-item nested">
                  &nbsp;&nbsp;&nbsp;📋 All Projects
                </div>
              </Link>
              
              {projects.length === 0 && !loading ? (
                <div className="sidebar-item nested">
                  &nbsp;&nbsp;&nbsp;No projects available
                </div>
              ) : (
                projects.map(project => (
                  <div key={project.id}>
                    <div className="sidebar-item nested" onClick={() => toggleProject(project.id)}>
                      &nbsp;&nbsp;&nbsp;📁 {project.name} {expandedProjects.has(project.id) ? '⬆️' : '⬇️'}
                      {loadingPages[project.id] && <span>&nbsp;⏳</span>}
                    </div>
                    
                    {expandedProjects.has(project.id) && (
                      <div className="nested-menu">
                        <Link to={`/projects/${project.id}/pages`}>
                          <div className="sidebar-item nested">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📋 View All Pages
                          </div>
                        </Link>
                        
                        {!projectPages[project.id] ? (
                          loadingPages[project.id] && (
                            <div className="sidebar-item nested">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Loading pages...
                            </div>
                          )
                        ) : projectPages[project.id].length === 0 ? (
                          <div className="sidebar-item nested">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No pages available
                          </div>
                        ) : (
                          projectPages[project.id].map(page => (
                            <div key={page.id}>
                              <div className="sidebar-item nested" onClick={() => togglePage(project.id, page.id)}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;📄 {page.name} {expandedPages.has(`${project.id}-${page.id}`) ? '⬆️' : '⬇️'}
                                {loadingKeys[`${project.id}-${page.id}`] && <span>&nbsp;⏳</span>}
                              </div>
                              
                              {expandedPages.has(`${project.id}-${page.id}`) && (
                                <div className="nested-menu">
                                  <Link to={`/projects/${project.id}/pages/${page.id}/translation-keys`}>
                                    <div className="sidebar-item nested">
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🔑 View All Keys
                                    </div>
                                  </Link>
                                  
                                  {!pageKeys[`${project.id}-${page.id}`] ? (
                                    loadingKeys[`${project.id}-${page.id}`] && (
                                      <div className="sidebar-item nested">
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Loading keys...
                                      </div>
                                    )
                                  ) : pageKeys[`${project.id}-${page.id}`].length === 0 ? (
                                    <div className="sidebar-item nested">
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No keys available
                                    </div>
                                  ) : (
                                    pageKeys[`${project.id}-${page.id}`].map(key => (
                                      <Link key={key.id} to={`/projects/${project.id}/pages/${page.id}/translation-keys/${key.id}/translations`}>
                                        <div className="sidebar-item nested">
                                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🔑 {key.key}
                                        </div>
                                      </Link>
                                    ))
                                  )}
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

