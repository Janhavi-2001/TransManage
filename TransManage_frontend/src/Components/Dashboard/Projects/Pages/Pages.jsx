import {React, useState, useEffect} from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { getPages, createPage, updatePage, deletePage } from '../../../../api/pagesApi';
import { useParams } from 'react-router-dom';
import './Pages.css';
import Sidebar from '../../Sidebar/Sidebar';

const Pages = () => {

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

    const viewPage = (id) => {
        window.location.href = `/projects/${id}/pages`;
    }

    const createPage = () => {
        setEditingPage(null);
        form.resetFields();
        setIsModalVisible(true);
    }
    const updatePage = (page) => {
        setEditingPage(page);
        form.setFieldsValue({
            title: page.title,
            content: page.content,
        });
        setIsModalVisible(true);
    }
    const deletePage = async (pageId) => {
        await deletePage(pageId);
        setPages(pages.filter(page => page.id !== pageId));
    }
    const handleSubmit = async (values) => {
        if (editingPage) {
            await updatePage(editingPage.id, values);
            setPages(pages.map(page => page.id === editingPage.id ? { ...page, ...values } : page));
        } else {
            const newPage = await createPage(id, values);
            setPages([...pages, newPage]);
        }
        setIsModalVisible(false);
        form.resetFields();
    }
    
    return (
        <div className="page-cards-container">
        <Sidebar />
        <div className="page-content">
        <h1 className="page-title">Pages</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={createPage} className="create-page-button">
            Create Page
        </Button>
        {pages.map(page => (
            <div className="page-card" key={page.id}>
            <h3>{page.title}</h3>
            <div className="card-actions">
                <Button icon={<EyeOutlined />} onClick={() => viewPage(page.id)} />
                <Button icon={<EditOutlined />} onClick={() => updatePage(page)} />
                <Button icon={<DeleteOutlined />} onClick={() => deletePage(page.id)} />
            </div>
            </div>
        ))}


        <Modal
            title={editingPage ? 'Edit Page' : 'Create Page'}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            >
            <Form
                form={form}
                onFinish={handleSubmit}
                initialValues={editingPage ? { title: editingPage.title, content: editingPage.content } : {}}
                >
                <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter page title' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please enter page content' }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item>
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