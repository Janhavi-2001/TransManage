import React from 'react';
import { Button, Modal, Form, Input, Table, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined, RightOutlined } from '@ant-design/icons';
import { getTranslationKeys, createTranslationKey, updateTranslationKey, deleteTranslationKey } from '../../../../../api/translationkeysApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Checkbox, Select } from 'antd';
import './TranslationKeys.css';
import Sidebar from '../../../Sidebar/Sidebar';
import { GoAlertFill } from "react-icons/go";


const TranslationKeys = () => {
    const navigate = useNavigate();
    const [translationKeys, setTranslationKeys] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTranslationKey, setEditingTranslationKey] = useState(null);
    const [form] = Form.useForm();
    const { id: projectId, pageId } = useParams();
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    useEffect(() => {
    const getAllTranslationKeys = async () => {
        try {
            const response = await getTranslationKeys(projectId, pageId);
            if (Array.isArray(response)) {
                setTranslationKeys(response);
            } else {
                console.error('Expected array but got:', response);
                setTranslationKeys([]);
            }
        } catch (error) {
            console.error('Failed to fetch translation keys:', error);
            setTranslationKeys([]);
        }
    };

        if (projectId && pageId) {
            getAllTranslationKeys();
        }
    }, [projectId, pageId]);

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
            transKeyName: key.transKeyName,
            sourceText: key.sourceText,
            description: key.description,
            keyType: key.keyType,
            isRequired: Boolean(key.isRequired),
            characterLimit: key.characterLimit
        });
        setIsModalVisible(true);
    };

    const handleSubmit = async (values) => {
        try {    
            const translationKeyData = {
                ...values,
                pageId: pageId,
                projectId: projectId,
                isRequired: !!values.isRequired,
                characterLimit: parseInt(values.characterLimit ?? 1000, 10)
            };
            
            if (editingTranslationKey) {
                await updateTranslationKey(projectId, pageId, editingTranslationKey.id, translationKeyData);
                const updatedList = await getTranslationKeys(projectId, pageId);
                setTranslationKeys(updatedList);
            } else {
                const newKey = await createTranslationKey(projectId, pageId, translationKeyData);                
                if (newKey) {
                    setTranslationKeys(prev => [...prev, newKey]);
                } else {
                    const refreshedList = await getTranslationKeys(projectId, pageId);
                    setTranslationKeys(refreshedList);
                }
            }
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Failed to save translation key:', error);
        }
    }

    const handleDeleteTranslationKey = async (keyId) => {
        try {
            await deleteTranslationKey(projectId, pageId, keyId);
            setTranslationKeys(translationKeys.filter(key => key.id !== keyId));
            setDeleteConfirmation(null);
        } catch (error) {
            console.error('Failed to delete translation key:', error);
        }
    }

    return (
        <div className="translation-keys-container">
        <Sidebar />
            <div className="translation-keys-content">
            <h3>
                <span style = {{ color: '#525252', marginRight: '4px'}}>Projects</span>
                <span style = {{ color: '#525252'}}><RightOutlined style={{ fontSize: '12px', marginRight: '4px', marginLeft: '4px' }}/> Project {projectId} </span>
                <span style = {{ color: '#525252'}}><RightOutlined style={{ fontSize: '12px', marginRight: '4px', marginLeft: '4px' }}/> Pages</span>
                <span style = {{ color: '#525252'}}><RightOutlined style={{ fontSize: '12px', marginRight: '4px', marginLeft: '4px' }}/> Page {pageId} </span>
                <span style = {{ color: '#525252'}}><RightOutlined style={{ fontSize: '12px', marginRight: '4px', marginLeft: '4px' }}/> Translation Keys</span>
            </h3>
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
                        dataIndex: 'transKey',
                        key: 'transKey',
                    },
                    {
                        title: 'Key Name',
                        dataIndex: 'transKeyName',
                        key: 'transKeyName',
                    },
                    {
                        title: 'Key Type',
                        dataIndex: 'keyType',
                        key: 'keyType',
                        render: (type) => {
                            let color = 'green';
                            if (type === 'TITLE') {
                                color = 'blue';
                            } else if (type === 'TEXT') {
                                color = 'orange';
                            } else if (type === 'BUTTON') {
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
                                <Button className="delete-button" icon={<DeleteOutlined />} onClick={() => setDeleteConfirmation({ transKeyName: record.transKeyName, id: record.id })} />
                            </>
                        ),
                    },
                ]}
            />
            <Modal
                title="Delete Translation Key"
                open={!!deleteConfirmation}
                onCancel={() => setDeleteConfirmation(null)}
                footer={null}
            >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <GoAlertFill style={{ color: '#ff4d4f', fontSize: '48px', marginRight: '12px' }} />
                    <div>
                        <p style={{ margin: 10, fontSize: '16px', fontWeight: '500' }}>
                            Are you sure you want to delete <strong>{deleteConfirmation?.transKeyName}</strong>?
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <Button onClick={() => setDeleteConfirmation(null)}>
                        Cancel
                    </Button>
                    <Button type="primary" danger onClick={() => handleDeleteTranslationKey(deleteConfirmation?.id)}>
                        Delete
                    </Button>
                </div>
            </Modal>
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
                        initialValues={editingTranslationKey ? { transKeyName: editingTranslationKey.transKeyName, sourceText: editingTranslationKey.sourceText, description: editingTranslationKey.description, keyType: editingTranslationKey.keyType, isRequired: editingTranslationKey.isRequired, characterLimit: editingTranslationKey.characterLimit } : {}}
                    >
                        <Form.Item name="transKeyName" label="Key Name" rules={[{ required: true, message: 'Please enter key name' }]}>
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
                                <Select.Option value="TITLE">Title</Select.Option>
                                <Select.Option value="BUTTON">Button</Select.Option>
                                <Select.Option value="TEXT">Text</Select.Option>
                                <Select.Option value="PLACEHOLDER">Placeholder</Select.Option>
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