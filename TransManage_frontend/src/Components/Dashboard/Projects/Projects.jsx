import Sidebar from '../Sidebar/Sidebar';
import '../Sidebar/Sidebar.css';
import './Projects.css';
import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Tag} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { getProjects, createProject, updateProject, deleteProject } from '../../../api/projectsApi';
import languageToCountryCode from '../../../Data/languageToCountryCode';
import ReactCountryFlag from 'react-country-flag';
import { GoAlertFill } from "react-icons/go";
import { useNavigate, useParams } from 'react-router-dom';


const Projects = () => {

    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [form] = Form.useForm();
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    const flagStyle = { width: '1.3em', height: '1.3em', marginRight: '0.4em', verticalAlign: 'middle' };

    useEffect(() => {
    const getAllProjects = async () => {
        try {
            const response = await getProjects();
            if (Array.isArray(response)) {
                setProjects(response);
            } else {
                console.error('Expected array but got:', response);
                setProjects([]);
            }
            } catch (error) {
                console.error('Failed to fetch projects:', error);
                setProjects([]);
            }
        };
        getAllProjects();
    }, []);

    const handleViewProject = (id) => {
        navigate(`/projects/${id}`);
    }

    const handleCreateProject = () => {
        setEditingProject(null);
        form.resetFields();
        setIsModalVisible(true);
    }

    const handleUpdateProject = (project) => {
        setEditingProject(project);
        form.setFieldsValue({
            name: project.name,
            description: project.description,
            baseLanguage: project.baseLanguage,
            targetLanguages: project.targetLanguages ? project.targetLanguages.split(',').map(lang => lang.trim()) : [],
            status: project.status,
        });
        setIsModalVisible(true);
    }

    const handleSubmit = async (values) => {
        try {
            const projectData = {
            ...values,
            targetLanguages: Array.isArray(values.targetLanguages) 
                ? values.targetLanguages.join(', ') 
                : values.targetLanguages || '',
                status: values.status || (editingProject ? editingProject.status : 'PENDING')
            };

            if (editingProject) {
                await updateProject(editingProject.id, projectData);
                const updatedList = await getProjects();
                setProjects(updatedList);
            } else {
                const newProject = await createProject(projectData);
                setProjects([...projects, newProject]);
            }
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Failed to save project:', error);
        }
    }

    const handleDeleteProject = async (id) => {
        try {
            await deleteProject(id);
            setProjects(projects.filter(p => p.id !== id));
            setDeleteConfirmation(null);
        } catch (error) {
            console.error('Failed to delete project:', error);
        }
    }

    return (
        <>
        <div className="projects-container">
            <Sidebar />
            <div className="projects-content">
                <h1 style = {{ color: '#525252'}}>Your Translation Projects</h1>
                <Button className="create-button" type="primary" icon={<PlusOutlined />} onClick={handleCreateProject}>
                    Add Project
                </Button>
                <Table
                    className="projects-table"
                    pagination={{ pageSize: 5 }}
                    dataSource={projects}
                    scroll={{ x: 'max-content' }}
                    rowKey="id"
                    columns={[
                        { title: 'Name', dataIndex: 'name', key: 'name', render: (text) => (
                            <span className="project-name">{text}</span>
                            ) },
                            { title: 'Description', dataIndex: 'description', key: 'description' , render: (text) => (
                                <span className="project-description">{text}</span>
                            ) },
                            { title: 'Base Language', dataIndex: 'baseLanguage', key: 'baseLanguage', render: (lang) => {
                                const code = languageToCountryCode[lang];
                                return (
                                <span className="language-badge">
                                    {code && <ReactCountryFlag countryCode={code} svg style={flagStyle} />}
                                    {lang}
                                </span>
                                );
                            }},
                            { title: 'Target Languages', dataIndex: 'targetLanguages', key: 'targetLanguages', render: (text) =>
                                text
                                ? text.split(',').map((lang) => {
                                    const trimmed = lang.trim();
                                    const code = languageToCountryCode[trimmed];
                                    return (
                                        <span key={trimmed} className="language-badge">
                                        {code && <ReactCountryFlag countryCode={code} svg style={flagStyle} />}
                                        {trimmed}
                                        </span>
                                    );
                                    })
                                : null,
                            },
                            { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: (text) => {
                                console.log('CreatedAt raw value:', text);
                                return new Date(text).toLocaleString();
                            }},
                            { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt', render: (text) => {
                                console.log('UpdatedAt raw value:', text);
                                return new Date(text).toLocaleString();
                            }},
                            { title: 'Status', dataIndex: 'status', key: 'status', render: (text = '') => {
                                const colorMap = {
                                    active: 'green',
                                    pending: 'orange',
                                    completed: 'blue',
                                    cancelled: 'red',
                                    onhold: 'grey',
                                };

                                const color = colorMap[text.toLowerCase()] || 'default';

                                return <Tag color={color}>{text}</Tag>;
                            }},
                            { title: 'Actions', key: 'actions', render: (_, record) => (
                            <>
                                <Button className="view-button" icon={<EyeOutlined />} onClick={() => handleViewProject(`${record.id}/pages`)} />
                                <Button className="edit-button" icon={<EditOutlined />} onClick={() => handleUpdateProject(record)} />
                                <Button className="delete-button" icon={<DeleteOutlined />} onClick={() => setDeleteConfirmation({ id: record.id, name: record.name })} />
                            </>
                        ) },
                    ]}
                />
                <Modal
                    title="Delete Project"
                    open={!!deleteConfirmation}
                    onCancel={() => setDeleteConfirmation(null)}
                    footer={null}
                >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <GoAlertFill style={{ color: '#ff4d4f', fontSize: '48px', marginRight: '12px' }} />
                        <div>
                            <p style={{ margin: 10, fontSize: '16px', fontWeight: '500' }}>
                                Are you sure you want to delete <strong>{deleteConfirmation?.name}</strong>?
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <Button onClick={() => setDeleteConfirmation(null)}>
                            Cancel
                        </Button>
                        <Button 
                            type="primary" 
                            danger 
                            onClick={() => handleDeleteProject(deleteConfirmation?.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </Modal>
                <Modal
                    title={editingProject ? 'Edit Project' : 'Add Project'}
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                >
                    <br />
                    <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 18 }} layout="horizontal" onFinish={handleSubmit}>
                        <Form.Item name="name" label="Name" className="form-input" rules={[{ required: true, message: 'Please enter project name' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label="Description" className="form-input">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item name="baseLanguage" label="Base Language" className="form-input" rules={[{ required: true, message: 'Please select base language' }]}>
                            <Select mode="single" placeholder="Select base language">
                                {Object.keys(languageToCountryCode).map(text => (
                                    <Select.Option key={text} value={text}>
                                        <ReactCountryFlag countryCode={languageToCountryCode[text]} svg style={flagStyle} />
                                        {text}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="targetLanguages"
                            label="Target Languages"
                            className="form-input"
                            rules={[{ required: true, message: 'Please select target languages' }]}
                            >
                            <Select mode="multiple" placeholder="Select target languages">
                                {Object.keys(languageToCountryCode).map(text => (
                                    <Select.Option key={text} value={text}>
                                        <ReactCountryFlag countryCode={languageToCountryCode[text]} svg style={flagStyle} />
                                        {text}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        {editingProject && (
                        <Form.Item
                            name="status"
                            label="Status"
                            className="form-input"
                            rules={[{ required: true, message: 'Please select status' }]}
                        >
                            <Select placeholder="Select project status">
                            {['PENDING', 'ACTIVE', 'COMPLETED', 'ON_HOLD', 'CANCELLED'].map(status => (
                                <Select.Option key={status} value={status}>
                                {status}
                                </Select.Option>
                            ))}
                            </Select>
                        </Form.Item>
                        )}
                        <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button type="primary" htmlType="submit" className='form-submit-button'>
                                {editingProject ? 'Update Project' : 'Create Project'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
        </>
    );
}

export default Projects;