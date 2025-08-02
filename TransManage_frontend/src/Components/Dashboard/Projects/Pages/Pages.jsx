import {React, useState, useEffect} from 'react';
import { Button, Modal, Form, Input, Table, Tag, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, RightOutlined } from '@ant-design/icons';
import { getPages, createPage, updatePage, deletePage } from '../../../../api/pagesApi';
import { useNavigate, useParams } from 'react-router-dom';
import './Pages.css';
import Sidebar from '../../Sidebar/Sidebar';
import { GoAlertFill } from "react-icons/go";

const Pages = () => {

    const navigate = useNavigate();
    const [pages, setPages] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingPage, setEditingPage] = useState(null);
    const [form] = Form.useForm();
    const { id } = useParams();
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    useEffect(() => {
        const getAllPages = async () => {
            try {
                const response = await getPages(id);
                if (Array.isArray(response)) {
                    setPages(response);
                } else {
                    console.error('Expected array but got:', response);
                    setPages([]);
                }
            } catch (error) {
                console.error('Failed to fetch pages:', error);
                setPages([]);
            }
        };
        getAllPages();
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
            status: page.status
        });
        setIsModalVisible(true);
    }

    const handleSubmit = async (values) => {
        try {
            const pageData = {
            ...values,
                pageId: editingPage ? editingPage.id : null,
                projectId: id,
                status: values.status || (editingPage ? editingPage.status : 'PENDING')
            };

            if (editingPage) {
                await updatePage(id, editingPage.id, pageData);
                const updatedList = await getPages(id);
                setPages(updatedList);
            } else {
                const newPage = await createPage(id, pageData);
                setPages([...pages, newPage]);
            }
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Failed to save page:', error);
        }
    }

    const handleDeletePage = async (pageId) => {
        try {
            await deletePage(id, pageId);
            setPages(pages.filter(p => p.id !== pageId));
            setDeleteConfirmation(null);
        } catch (error) {
            console.error('Failed to delete page:', error);
        }
    }

    return (
        <div className="pages-container">
        <Sidebar />
            <div className="pages-content">
            <h3>
                <span style = {{ color: '#525252', marginRight: '4px'}}>Projects </span>
                <span style = {{ color: '#525252'}}><RightOutlined style={{ fontSize: '12px', marginRight: '4px', marginLeft: '4px' }}/> Project {id} <RightOutlined style={{ fontSize: '12px', marginRight: '4px' }}/> Pages</span>
            </h3>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreatePage} className="create-page-button"> Add Page </Button>
            
            <Table
                className="pages-table"
                pagination={{ pageSize: 5 }}
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
                                pending: 'orange',
                                completed: 'blue',
                                cancelled: 'red',
                                onhold: 'grey',
                            };
                            const color = colorMap[text.toLowerCase()] || 'default';
                            return <Tag color={color}>{text}</Tag>;
                        }
                    },
                    { title: 'Actions', key: 'actions', render: (_, record) => (
                            <>
                                <Button className="view-button" icon={<EyeOutlined />} onClick={() => handleViewPage(record.id)} />
                                <Button className="edit-button" icon={<EditOutlined />} onClick={() => handleUpdatePage(record)} />
                                <Button className="delete-button" icon={<DeleteOutlined />} onClick={() => setDeleteConfirmation({ id: record.id, name: record.name })} />
                            </>
                    ) },
                ]}
            />
            <Modal
                title="Delete Page"
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
                    <Button type="primary" danger onClick={() => handleDeletePage(deleteConfirmation?.id)}>
                        Delete
                    </Button>
                </div>
            </Modal>
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
                    {editingPage && (
                        <Form.Item
                            name="status"
                            label="Status"
                            className="form-input"
                            rules={[{ required: true, message: 'Please select status' }]}
                        >
                            <Select placeholder="Select page status">
                            {['PENDING', 'ACTIVE', 'COMPLETED', 'ON_HOLD', 'CANCELLED'].map(status => (
                                <Select.Option key={status} value={status}>
                                {status}
                                </Select.Option>
                            ))}
                            </Select>
                        </Form.Item>
                        )}
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