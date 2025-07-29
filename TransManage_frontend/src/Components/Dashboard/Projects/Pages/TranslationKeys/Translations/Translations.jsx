import React from 'react';
import { Button, Modal, Form, Input, Table, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { getTranslations, createTranslation, updateTranslation, deleteTranslation } from '../../../../../../api/translationsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Select } from 'antd';
import './Translations.css';
import Sidebar from '../../../../Sidebar/Sidebar';
import languageToCountryCode from '../../../../../../Data/languageToCountryCode';
import ReactCountryFlag from 'react-country-flag';


const Translations = () => {
    const navigate = useNavigate();
    const [translations, setTranslations] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTranslation, setEditingTranslation] = useState(null);
    const [form] = Form.useForm();
    const { id: projectId, pageId, translationKeyId } = useParams();

    const flagStyle = { width: '1.3em', height: '1.3em', marginRight: '0.4em', verticalAlign: 'middle' };

    useEffect(() => {
    const fetchTranslations = async () => {
            try {
                console.log('Fetching translations for projectId:', projectId, 'pageId:', pageId, 'translationKeyId:', translationKeyId);
                const response = await getTranslations(projectId, pageId, translationKeyId);
                console.log('Translations response:', response);
                
                let translationsArray = [];
                if (Array.isArray(response)) {
                    translationsArray = response;
                } else if (response && Array.isArray(response.data)) {
                    translationsArray = response.data;
                } else if (response && typeof response === 'object') {
                    translationsArray = Object.values(response);
                } else {
                    translationsArray = [];
                }

                setTranslations(translationsArray);
            } catch (error) {
                console.error('Error fetching translations:', error);
                setTranslations([]);
            }
        };

        if (projectId && pageId && translationKeyId) {
            fetchTranslations();
        }
    }, [projectId, pageId, translationKeyId]);

    useEffect(() => {
        if (editingTranslation && isModalVisible) {
            form.setFieldsValue({
                targetLanguage: editingTranslation.targetLanguage,
                translatedText: editingTranslation.translatedText,
                status: editingTranslation.status,
                notes: editingTranslation.notes
            });
        }
    }, [editingTranslation, isModalVisible, form]);

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

    const handleDeleteTranslation = async (translationId) => {
        await deleteTranslation(projectId, pageId, translationKeyId, translationId);
        setTranslations(translations.filter(translation => translation.id !== translationId));
    };

    const handleSubmit = async (values) => {
        if (editingTranslation) {
            await updateTranslation(projectId, pageId, translationKeyId, editingTranslation.id, values);
            const response = await getTranslations(projectId, pageId, translationKeyId);
            setTranslations(response);
        } else {
            await createTranslation(projectId, pageId, translationKeyId, values);
            const response = await getTranslations(projectId, pageId, translationKeyId);
            setTranslations(response);
        }
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <div className="translations-container">
        <Sidebar />
            <div className="translations-content">
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
                {' > '} Page {pageId} {' > '}
                <span 
                    onClick={() => navigate(`/projects/${projectId}/pages/${pageId}/translation-keys`)} 
                    style={{ cursor: 'pointer', color: '#1890ff', textDecoration: 'underline' }}
                >
                    Translation Keys
                </span>
                {' > '} Key {translationKeyId} {' > '} Translations
            </h1>
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
                            if (text === 'in review') color = 'orange';
                            else if (text === 'rejected') color = 'red';
                            else if(text === 'pending') color = 'grey';
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
                                <Button className="delete-button" icon={<DeleteOutlined />} onClick={() => handleDeleteTranslation(record.id)} />
                            </>
                        ),
                    },
                ]}
            />

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
                        initialValues={editingTranslation ? { 
                            targetLanguage: editingTranslation.targetLanguage,
                            translatedText: editingTranslation.translatedText,
                            status: editingTranslation.status,
                            notes: editingTranslation.notes,
                        } : {
                            status: 'pending' // Default status for new translations
                        }}
                    >
                    <Form.Item label="Target Language" name="targetLanguage" rules={[{ required: true, message: 'Please enter the target language' }]}>
                        <Input placeholder="Enter target language" />
                    </Form.Item>
                    <Form.Item label="Translated Text" name="translatedText" rules={[{ required: true, message: 'Please enter the translated text' }]}>
                        <Input.TextArea rows={2} placeholder="Enter translated text" />
                    </Form.Item>
                    <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select the status' }]}>
                        <Select placeholder="Select status">
                            <Select.Option value="pending">Pending</Select.Option>
                            <Select.Option value="approved">Approved</Select.Option>
                            <Select.Option value="in review">In Review</Select.Option>
                            <Select.Option value="rejected">Rejected</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Notes" name="notes">
                        <Input.TextArea rows={2} placeholder="Enter notes" />
                    </Form.Item>
                    <Form.Item>
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
