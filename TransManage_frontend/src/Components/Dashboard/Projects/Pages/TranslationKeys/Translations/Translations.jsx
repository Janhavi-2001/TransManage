import React from 'react';
import { Button, Modal, Form, Input, Table, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, RightOutlined } from '@ant-design/icons';
import { getTranslations, createTranslation, updateTranslation, deleteTranslation } from '../../../../../../api/translationsApi';
import { getProjectById } from '../../../../../../api/projectsApi'; // Add this import
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Select } from 'antd';
import './Translations.css';
import Sidebar from '../../../../Sidebar/Sidebar';
import languageToCountryCode from '../../../../../../Data/languageToCountryCode';
import ReactCountryFlag from 'react-country-flag';
import { GoAlertFill } from 'react-icons/go';


const Translations = () => {
    const [translations, setTranslations] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTranslation, setEditingTranslation] = useState(null);
    const [form] = Form.useForm();
    const { id: projectId, pageId, translationKeyId } = useParams();
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [projectTargetLanguages, setProjectTargetLanguages] = useState([]);

    const flagStyle = { width: '1.3em', height: '1.3em', marginRight: '0.4em', verticalAlign: 'middle' };

    useEffect(() => {
    const getAllTranslations = async () => {
            try {
                const response = await getTranslations(projectId, pageId, translationKeyId);
                if (Array.isArray(response)) {
                    setTranslations(response);
                } else {
                    console.error('Expected array but got:', response);
                    setTranslations([]);
                }
            } catch (error) {
                console.error('Error fetching translations:', error);
                setTranslations([]);
            }
        };

        const getProjectTargetLanguages = async () => {
            try {
                const project = await getProjectById(projectId);
                if (project && project.targetLanguages) {
                    const languages = project.targetLanguages.split(',').map(lang => lang.trim());
                    setProjectTargetLanguages(languages);
                    console.log('Project target languages:', languages);
                } else {
                    setProjectTargetLanguages([]);
                }
            } catch (error) {
                console.error('Error fetching project:', error);
                setProjectTargetLanguages([]);
            }
        };

        if (projectId && pageId && translationKeyId) {
            getAllTranslations();
            getProjectTargetLanguages();
        }
    }, [projectId, pageId, translationKeyId]);

    const handleCreateTranslation = () => {
        setEditingTranslation(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleUpdateTranslation = (translation) => {
        setEditingTranslation(translation);
        form.setFieldsValue({
            targetLanguage: translation.targetLanguage,
            translatedText: translation.translatedText,
            status: translation.status,
            notes: translation.notes
        });
        setIsModalVisible(true);
    };

    const handleSubmit = async (values) => {
        try {
            const translationData = {
                targetLanguage: values.targetLanguage,
                translatedText: values.translatedText,
                status: values.status,
                notes: values.notes
            };
            if (editingTranslation) {
                await updateTranslation(projectId, pageId, translationKeyId, editingTranslation.id, translationData);
                const updatedList = await getTranslations(projectId, pageId, translationKeyId);
                setTranslations(updatedList);
            } else {
                const newKey = await createTranslation(projectId, pageId, translationKeyId, translationData);
                if (newKey) {
                    setTranslations(prev => [...prev, newKey]);
                } else {
                    const refreshedList = await getTranslations(projectId, pageId, translationKeyId);
                    setTranslations(refreshedList);
                }
            }
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Failed to save translation:', error);
        }
    };

    const handleDeleteTranslation = async (translationId) => {
        try {
            await deleteTranslation(projectId, pageId, translationKeyId, translationId);
            setTranslations(translations.filter(translation => translation.id !== translationId));
            setDeleteConfirmation(null);
        } catch (error) {
            console.error('Failed to delete translation:', error);
        }
    }

    return (
        <div className="translations-container">
        <Sidebar />
            <div className="translations-content">
            <h3>
                <span style = {{ color: '#525252', marginRight: '4px'}}>Projects</span>
                <span style = {{ color: '#525252'}}><RightOutlined style={{ fontSize: '12px', marginRight: '4px', marginLeft: '4px' }}/> Project {projectId} </span>
                <span style = {{ color: '#525252'}}><RightOutlined style={{ fontSize: '12px', marginRight: '4px', marginLeft: '4px' }}/> Pages</span>
                <span style = {{ color: '#525252'}}><RightOutlined style={{ fontSize: '12px', marginRight: '4px', marginLeft: '4px' }}/> Page {pageId} </span>
                <span style = {{ color: '#525252'}}><RightOutlined style={{ fontSize: '12px', marginRight: '4px', marginLeft: '4px' }}/> Translation Keys</span>
                <span style = {{ color: '#525252'}}><RightOutlined style={{ fontSize: '12px', marginRight: '4px', marginLeft: '4px' }}/> Translations</span>
            </h3>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTranslation} className="create-translations-button"> Add Translation </Button>

            <Table
                className="translations-table"
                pagination={{ pageSize: 10 }}
                dataSource={translations}
                scroll={{ x: 'max-content' }}
                rowKey="id"
                columns={[
                    { title: 'Target Language', dataIndex: 'targetLanguage', key: 'targetLanguage', render: (text) => text
                            ? text.split(',').map((lang) => {
                                const trimmed = lang.trim();
                                const code = languageToCountryCode[trimmed];
                                return (
                                    <span key={trimmed} className="language-badge">
                                        {code && <ReactCountryFlag countryCode={code} svg style={flagStyle} />}
                                        {trimmed}
                                    </span>
                                );
                            }): null,
                    },
                    {
                        title: 'Translated Text',
                        dataIndex: 'translatedText',
                        key: 'translatedText',
                        render: (text) => <span>{text}</span>
                    },
                    {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        render: (text) => {
                            let color = 'green';
                            if (text === 'IN_REVIEW') color = 'orange';
                            else if (text === 'REJECTED') color = 'red';
                            else if(text === 'PENDING') color = 'yellow';
                            return <Tag color={color}>{text}</Tag>;
                        }
                    },
                    {
                        title: 'Notes',
                        dataIndex: 'notes',
                        key: 'notes',
                        render: (text) => <span>{text || 'No notes'}</span>
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
                                <Button className="edit-button" icon={<EditOutlined />} onClick={() => handleUpdateTranslation(record)} />
                                <Button className="delete-button" icon={<DeleteOutlined />} onClick={() => setDeleteConfirmation({ id: record.id, translatedText: record.translatedText })} />
                            </>
                        ),
                    },
                ]}
            />
            <Modal
                title="Delete Translation"
                open={!!deleteConfirmation}
                onCancel={() => setDeleteConfirmation(null)}
                footer={null}
            >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <GoAlertFill style={{ color: '#ff4d4f', fontSize: '48px', marginRight: '12px' }} />
                    <div>
                        <p style={{ margin: 10, fontSize: '16px', fontWeight: '500' }}>
                            Are you sure you want to delete <strong>{deleteConfirmation?.translatedText}</strong>?
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <Button onClick={() => setDeleteConfirmation(null)}>
                        Cancel
                    </Button>
                    <Button type="primary" danger onClick={() => handleDeleteTranslation(deleteConfirmation?.id)}>
                        Delete
                    </Button>
                </div>
            </Modal>
            <Modal
                title={editingTranslation ? 'Edit Translation' : 'Create Translation'}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                >
                <Form
                    labelCol={{ span: 7 }} wrapperCol={{ span: 18 }}
                    layout="horizontal" 
                    form={form}
                    onFinish={handleSubmit}
                    initialValues={editingTranslation ? { targetLanguage: editingTranslation.targetLanguage, translatedText: editingTranslation.translatedText, status: editingTranslation.status, notes: editingTranslation.notes } : {}}
                >
                    <Form.Item label="Target Language" name="targetLanguage" rules={[{ required: true, message: 'Please select a target language' }]}>
                        <Select placeholder="Select target language">
                            {projectTargetLanguages.map(language => {
                                const code = languageToCountryCode[language];
                                return (
                                    <Select.Option key={language} value={language}>
                                        {code && <ReactCountryFlag countryCode={code} svg style={{...flagStyle, marginRight: '8px'}} />}
                                        {language}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Translated Text" name="translatedText" rules={[{ required: true, message: 'Please enter the translated text' }]}>
                        <Input.TextArea rows={2} placeholder="Enter translated text" />
                    </Form.Item>
                    <Form.Item label="Notes" name="notes" rules={[{ required: true, message: 'Please enter translation remarks' }]}>
                        <Input.TextArea rows={2} placeholder="Enter translation remarks" />
                    </Form.Item>
                    {editingTranslation && (
                        <Form.Item
                            name="status"
                            label="Status"
                            className="form-input"
                            rules={[{ required: true, message: 'Please select status' }]}
                        >
                            <Select placeholder="Select page status">
                            {['PENDING', 'APPROVED', 'IN_REVIEW', 'REJECTED'].map(status => (
                                <Select.Option key={status} value={status}>
                                    {status}
                                </Select.Option>
                            ))}
                            </Select>
                        </Form.Item>
                        )}
                    <Form.Item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Button type="primary" htmlType="submit">
                            {editingTranslation ? 'Update Translation' : 'Create Translation'}
                        </Button>
                    </Form.Item>
                </Form>
                </Modal>
            </div>
        </div>
    );
}

export default Translations;
