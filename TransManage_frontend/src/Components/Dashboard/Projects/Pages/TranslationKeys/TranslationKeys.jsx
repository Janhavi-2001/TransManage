import React from 'react';
import { Button, Modal, Form, Input, Table, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { getTranslationKeys, createTranslationKey, updateTranslationKey, deleteTranslationKey } from '../../../../../api/translationkeysApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Checkbox, Select } from 'antd';
import './TranslationKeys.css';
import Sidebar from '../../../Sidebar/Sidebar';


const TranslationKeys = () => {
    const navigate = useNavigate();
    const [translationKeys, setTranslationKeys] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTranslationKey, setEditingTranslationKey] = useState(null);
    const [form] = Form.useForm();
    const { id: projectId, pageId } = useParams();

    useEffect(() => {
    const fetchTranslationKeys = async () => {
            try {
                console.log('Fetching translation keys for projectId:', projectId, 'pageId:', pageId);
                const response = await getTranslationKeys(projectId, pageId);
                console.log('Translation keys response:', response);
                
                let keysArray = [];
                if (Array.isArray(response)) {
                    keysArray = response;
                } else if (response && Array.isArray(response.data)) {
                    keysArray = response.data;
                } else if (response && typeof response === 'object') {
                    keysArray = Object.values(response);
                } else {
                    keysArray = [];
                }
                
                setTranslationKeys(keysArray);
            } catch (error) {
                console.error('Error fetching translation keys:', error);
                setTranslationKeys([]);
            }
        };

        if (projectId && pageId) {
            fetchTranslationKeys();
        }
    }, [projectId, pageId]);

    useEffect(() => {
        if (editingTranslationKey && isModalVisible) {
            form.setFieldsValue({
                keyName: editingTranslationKey.keyName,
                sourceText: editingTranslationKey.sourceText,
                description: editingTranslationKey.description,
                keyType: editingTranslationKey.keyType,
                isRequired: editingTranslationKey.isRequired,
                characterLimit: editingTranslationKey.characterLimit
            });
        }
    }, [editingTranslationKey, isModalVisible, form]);

    const handleViewTranslationKey = (keyId) => {
        navigate(`/projects/${projectId}/pages/${pageId}/translation-keys/${keyId}/translations`);
    };

    const handleCreateTranslationKey = () => {
        setEditingTranslationKey(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleUpdateTranslationKey = (key) => {
        setEditingTranslationKey(key);
        form.setFieldsValue({
            keyName: key.keyName,
            sourceText: key.sourceText,
            description: key.description,
            keyType: key.keyType,
            isRequired: key.isRequired,
            characterLimit: key.characterLimit
        });
        setIsModalVisible(true);
    };

    const handleDeleteTranslationKey = async (keyId) => {
        await deleteTranslationKey(projectId, pageId, keyId);
        setTranslationKeys(translationKeys.filter(key => key.id !== keyId));
    };

    const handleSubmit = async (values) => {
        if (editingTranslationKey) {
            await updateTranslationKey(projectId, pageId, editingTranslationKey.id, values);
            const response = await getTranslationKeys(projectId, pageId);
            setTranslationKeys(response);
        } else {
            await createTranslationKey(projectId, pageId, values);
            const response = await getTranslationKeys(projectId, pageId);
            setTranslationKeys(response);
        }
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <div className="translation-keys-container">
        <Sidebar />
            <div className="translation-keys-content">
            <h1>
                <span 
                    onClick={() => navigate('/projects')} 
                    style={{ cursor: 'pointer', color: '#1890ff', textDecoration: 'underline' }}
                >
                    Projects
                </span>
                {' > '} Project {projectId} {' > '}
                <span 
                    onClick={() => navigate(`/projects/${projectId}/pages`)} 
                    style={{ cursor: 'pointer', color: '#1890ff', textDecoration: 'underline' }}
                >
                    Pages
                </span>
                {' > '} Page {pageId} {' > '} Translation Keys
            </h1>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTranslationKey} className="create-translation-key-button"> Add Translation Key </Button>

            <Table
                className="translation-keys-table"
                pagination={{ pageSize: 10 }}
                dataSource={translationKeys}
                scroll={{ x: 'max-content' }}
                rowKey="id"
                columns={[
                    {
                        title: 'Key',
                        dataIndex: 'key',
                        key: 'key',
                    },
                    {
                        title: 'Key Name',
                        dataIndex: 'keyName',
                        key: 'keyName',
                    },
                    {
                        title: 'Key Type',
                        dataIndex: 'keyType',
                        key: 'keyType',
                        render: (type) => {
                            let color = 'green';
                            if (type === 'title') {
                                color = 'blue';
                            } else if (type === 'text') {
                                color = 'orange';
                            } else if (type === 'button') {
                                color = 'red';
                            }
                            return <Tag color={color}>{type}</Tag>;
                        }
                    },
                    {
                        title: 'Source Text',
                        dataIndex: 'sourceText',
                        key: 'sourceText',
                        width: 200,
                        render: (text) => text ? text : 'No Source Text'
                    },
                    {
                        title: 'Description',
                        dataIndex: 'description',
                        key: 'description',
                        width: 180,
                        render: (text) => text ? text : 'No Description'
                    },
                    {
                        title: 'Created At',
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        render: (text) => text ? new Date(text).toLocaleString() : ''
                    },
                    {
                        title: 'Updated At',
                        dataIndex: 'updatedAt',
                        key: 'updatedAt',
                        render: (text) => text ? new Date(text).toLocaleString() : ''
                    },
                    {
                        title: 'Actions',
                        key: 'actions',
                        render: (_, record) => (
                            <>
                                <Button className="view-button" icon={<EyeOutlined />} onClick={() => handleViewTranslationKey(record.id)} />
                                <Button className="edit-button" icon={<EditOutlined />} onClick={() => handleUpdateTranslationKey(record)} />
                                <Button className="delete-button" icon={<DeleteOutlined />} onClick={() => handleDeleteTranslationKey(record.id)} />
                            </>
                        ),
                    },
                ]}
            />

            <Modal
                title={editingTranslationKey ? 'Edit Translation Key' : 'Create Translation Key'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                >
                <Form
                        labelCol={{ span: 7 }} wrapperCol={{ span: 18 }}
                        layout="horizontal" 
                        form={form}
                        onFinish={handleSubmit}
                        initialValues={editingTranslationKey ? { 
                            keyName: editingTranslationKey.keyName, 
                            sourceText: editingTranslationKey.sourceText, 
                            description: editingTranslationKey.description,
                            keyType: editingTranslationKey.keyType,
                            isRequired: editingTranslationKey.isRequired,
                            characterLimit: editingTranslationKey.characterLimit
                        } : {
                            isRequired: true
                        }}
                    >
                        <Form.Item name="keyName" label="Key Name" rules={[{ required: true, message: 'Please enter key name' }]}>
                            <Input placeholder="e.g., welcome_message, submit_button" />
                        </Form.Item>
                        
                        <Form.Item name="sourceText" label="Source Text" rules={[{ required: true, message: 'Please enter source text' }]}>
                            <Input.TextArea rows={3} placeholder="Original text to be translated" />
                        </Form.Item>
                        
                        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter description' }]}>
                            <Input placeholder="Context for translators" />
                        </Form.Item>
                        
                        <Form.Item name="keyType" label="Key Type" rules={[{ required: true, message: 'Please select key type' }]}>
                            <Select placeholder="Select key type">
                                <Select.Option value="title">Title</Select.Option>
                                <Select.Option value="button">Button</Select.Option>
                                <Select.Option value="text">Text</Select.Option>
                                <Select.Option value="placeholder">Placeholder</Select.Option>
                                <Select.Option value="error">Error</Select.Option>
                            </Select>
                        </Form.Item>
                        
                        <Form.Item name="isRequired" valuePropName="checked" wrapperCol={{ offset: 7, span: 18 }}>
                            <Checkbox>This is a required translation</Checkbox>
                        </Form.Item>
                        
                        <Form.Item name="characterLimit" label="Character Limit">
                            <Input type="number" placeholder="Maximum characters (optional)" />
                        </Form.Item>
                        
                        <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button type="primary" htmlType="submit">
                                {editingTranslationKey ? 'Update Translation Key' : 'Create Translation Key'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
}

export default TranslationKeys;