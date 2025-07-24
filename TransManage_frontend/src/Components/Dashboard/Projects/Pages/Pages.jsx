import {React, useState, useEffect} from 'react';
import { Button, Modal, Form, Input, Table, Tag} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { getPages, createPage, updatePage, deletePage } from '../../../../api/pagesApi';
import { useNavigate, useParams } from 'react-router-dom';
import './Pages.css';
import Sidebar from '../../Sidebar/Sidebar';

const Pages = () => {

    const navigate = useNavigate();
    const [pages, setPages] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingPage, setEditingPage] = useState(null);
    const [form] = Form.useForm();
    const { id } = useParams();

    useEffect(() => {
        const fetchPages = async () => {
            const response = await getPages(id);
            setPages(response);
        };

        fetchPages();
    }, [id]);

    const handleViewPage = (pageId) => {
        navigate(`/projects/${id}/pages/${pageId}/translation-keys`);
    };


    const handleCreatePage = () => {
        setEditingPage(null);
        form.resetFields();
        setIsModalVisible(true);
    }
    const handleUpdatePage = (page) => {
        setEditingPage(page);
        form.setFieldsValue({
            name: page.name,
            description: page.description,
            content: page.content,
        });
        setIsModalVisible(true);
    }
    const handleDeletePage = async (pageId) => {
        await deletePage(pageId);
        setPages(pages.filter(page => page.id !== pageId));
    }
    const handleSubmit = async (values) => {
        if (editingPage) {
            await updatePage(editingPage.id, values);
            const response = await getPages(id);
            console.log('Updated pages response:', response);
            if (response && response.pages) {
                if (Array.isArray(response.pages)) {
                    setPages(response.pages);
                } else if (typeof response.pages === 'object') {
                    setPages(Object.values(response.pages));
                } else {
                    console.error('Unexpected pages format:', response.pages);
                    setPages([]);
                }
                } else {
                setPages([]);
                }
        } else {
            const newPage = await createPage(id, values);
            setPages([...pages, newPage]);
        }
        setIsModalVisible(false);
        form.resetFields();
    }
    
    return (
        <div className="pages-container">
        <Sidebar />
            <div className="pages-content">
            <h1>
                <span 
                    onClick={() => navigate('/projects')} 
                    style={{ cursor: 'pointer', color: '#1890ff', textDecoration: 'underline' }}
                >
                    Projects
                </span>
                {' > '} Project {id} {' > '} Pages
            </h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreatePage} className="create-page-button"> Add Page </Button>
            
            <Table
                className="pages-table"
                pagination={{ pageSize: 10 }}
                dataSource={pages}
                scroll={{ x: 'max-content' }}
                rowKey="id"
                columns={[
                    { 
                        title: 'Name', 
                        dataIndex: 'name', 
                        key: 'name', 
                        render: (text, record) => (
                            <span className="page-name">{text || record.name || 'No Name'}</span>
                        ) 
                    },
                    {
                        title: 'Description',
                        dataIndex: 'description',
                        key: 'description',
                        width: 180,
                        render: (text) => text || 'No Description'
                    },
                    {
                        title: 'Content',
                        dataIndex: 'content',
                        key: 'content',
                        render: (text) => text || 'No Content'
                    },
                    {
                        title: 'Created At',
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        render: (text) => text ? new Date(text).toLocaleString() : 'N/A'
                    },
                    { 
                        title: 'Updated At', 
                        dataIndex: 'updatedAt', 
                        key: 'updatedAt', 
                        render: (text) => text ? new Date(text).toLocaleString() : 'N/A'
                    },
                    { 
                        title: 'Status', 
                        dataIndex: 'status', 
                        key: 'status', 
                        render: (text) => {
                            const colorMap = {
                                active: 'green',
                                pending: 'red',
                                completed: 'blue',
                            };
                            const color = colorMap[text.toLowerCase()] || 'default';
                            return <Tag color={color}>{text}</Tag>;
                        }
                    },
                    { title: 'Actions', key: 'actions', render: (_, record) => (
                            <>
                                <Button className="view-button" icon={<EyeOutlined />} onClick={() => handleViewPage(record.id)} />
                                <Button className="edit-button" icon={<EditOutlined />} onClick={() => handleUpdatePage(record.id)} />
                                <Button className="delete-button" icon={<DeleteOutlined />} onClick={() => handleDeletePage(record.id)} />
                            </>
                    ) },
                ]}
            />

            <Modal
                title={editingPage ? 'Edit Page' : 'Create Page'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                >
                <Form
                    labelCol={{ span: 7 }} wrapperCol={{ span: 18 }}
                    layout="horizontal" 
                    form={form}
                    onFinish={handleSubmit}
                    initialValues={editingPage ? { name: editingPage.name, description: editingPage.description, content: editingPage.content } : {}}
                    >
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter page name' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter page description' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please enter page content' }]}>
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Button type="primary" htmlType="submit">
                            {editingPage ? 'Update Page' : 'Create Page'}
                        </Button>
                    </Form.Item>
                </Form>
                </Modal>
            </div>
        </div>
    );
};

export default Pages;