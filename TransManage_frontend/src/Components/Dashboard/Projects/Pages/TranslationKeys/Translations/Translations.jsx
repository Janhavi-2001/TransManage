import React from 'react';
import { Button, Modal, Form, Input, Table, Tag, Alert, List, Progress, notification } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, RightOutlined, RobotOutlined } from '@ant-design/icons';
import { getTranslations, createTranslation, updateTranslation, deleteTranslation, reviewTranslation, reviewPageTranslations } from '../../../../../../api/translationsApi';
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
    const [notificationApi, notificationContextHolder] = notification.useNotification();
    const [translations, setTranslations] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTranslation, setEditingTranslation] = useState(null);
    const [form] = Form.useForm();
    const { id: projectId, pageId, translationKeyId } = useParams();
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [projectTargetLanguages, setProjectTargetLanguages] = useState([]);
    const [reviewResult, setReviewResult] = useState(null);
    const [reviewedTranslation, setReviewedTranslation] = useState(null);
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [isReviewLoading, setIsReviewLoading] = useState(false);
    const [reviewError, setReviewError] = useState(null);
    const [saveError, setSaveError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [batchReviewResults, setBatchReviewResults] = useState([]);
    const [isBatchReviewVisible, setIsBatchReviewVisible] = useState(false);
    const [isBatchReviewLoading, setIsBatchReviewLoading] = useState(false);
    const [batchReviewError, setBatchReviewError] = useState(null);

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
        setSaveError(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleUpdateTranslation = (translation) => {
        setEditingTranslation(translation);
        setSaveError(null);
        form.setFieldsValue({
            targetLanguage: translation.targetLanguage,
            translatedText: translation.translatedText,
            status: translation.status,
            notes: translation.notes
        });
        setIsModalVisible(true);
    };

    const handleSubmit = async (values) => {
        setSaveError(null);
        setIsSaving(true);
        try {
            const translationData = {
                targetLanguage: values.targetLanguage,
                translatedText: values.translatedText,
                status: values.status,
                notes: values.notes
            };
            if (editingTranslation) {
                const updatedTranslation = await updateTranslation(
                    projectId,
                    pageId,
                    translationKeyId,
                    editingTranslation.id,
                    translationData
                );
                setTranslations(prev => prev.map(translation =>
                    translation.id === updatedTranslation.id ? updatedTranslation : translation
                ));
                notificationApi.success({
                    message: 'Translation updated',
                    description: 'The translation was updated successfully.',
                    placement: 'top',
                    duration: 0,
                    className: 'translation-success-notification',
                });
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
            setSaveError(error.message || 'Unable to save the translation.');
        } finally {
            setIsSaving(false);
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

    const handleReviewTranslation = async (translation) => {
        setReviewedTranslation(translation);
        setReviewResult(null);
        setReviewError(null);
        setIsReviewModalVisible(true);
        setIsReviewLoading(true);

        try {
            const result = await reviewTranslation(projectId, pageId, translationKeyId, translation.id);
            setReviewResult(result);
        } catch (error) {
            setReviewError(error.message || 'Unable to review this translation.');
        } finally {
            setIsReviewLoading(false);
        }
    };

    const handleBatchReview = async () => {
        setBatchReviewResults([]);
        setBatchReviewError(null);
        setIsBatchReviewVisible(true);
        setIsBatchReviewLoading(true);

        try {
            const results = await reviewPageTranslations(projectId, pageId);
            setBatchReviewResults(Array.isArray(results) ? results : []);
        } catch (error) {
            setBatchReviewError(error.message || 'Unable to review page translations.');
        } finally {
            setIsBatchReviewLoading(false);
        }
    };

    const handleApplySuggestion = () => {
        if (!reviewedTranslation || !reviewResult?.suggestedText) {
            return;
        }

        setSaveError(null);
        setEditingTranslation(reviewedTranslation);
        form.setFieldsValue({
            targetLanguage: reviewedTranslation.targetLanguage,
            translatedText: reviewResult.suggestedText,
            status: reviewedTranslation.status,
            notes: reviewedTranslation.notes
        });
        setIsReviewModalVisible(false);
        setIsModalVisible(true);
    };

    return (
        <div className="translations-container">
        {notificationContextHolder}
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
            <Button type="default" icon={<RobotOutlined />} onClick={handleBatchReview} className="batch-review-button">
                Review Page Translations
            </Button>
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
                                <Button
                                    className="ai-review-button"
                                    icon={<RobotOutlined />}
                                    loading={isReviewLoading && reviewedTranslation?.id === record.id}
                                    onClick={() => handleReviewTranslation(record)}
                                >
                                </Button>
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
                title="AI Translation Review"
                open={isReviewModalVisible}
                onCancel={() => setIsReviewModalVisible(false)}
                footer={reviewResult ? [
                    <Button key="close" onClick={() => setIsReviewModalVisible(false)}>
                        Close
                    </Button>,
                    <Button key="apply" type="primary" onClick={handleApplySuggestion}>
                        Apply Suggestion
                    </Button>
                ] : null}
            >
                {isReviewLoading && <Progress percent={50} status="active" showInfo={false} />}
                {reviewError && <Alert type="error" message={reviewError} showIcon />}
                {reviewResult && (
                    <div className="ai-review-result">
                        <div className="ai-review-score">
                            <span>Quality score</span>
                            <Progress
                                type="circle"
                                percent={reviewResult.score}
                                size={80}
                                status={reviewResult.score >= 80 ? 'success' : 'exception'}
                            />
                        </div>
                        <Tag color={reviewResult.recommendation === 'APPROVED' ? 'green' : 'orange'}>
                            {reviewResult.recommendation}
                        </Tag>
                        <h4>Review issues</h4>
                        {reviewResult.issues?.length ? (
                            <List
                                size="small"
                                bordered
                                dataSource={reviewResult.issues}
                                renderItem={(issue) => <List.Item>{issue}</List.Item>}
                            />
                        ) : (
                            <Alert type="success" message="No issues found" showIcon />
                        )}
                        <h4>Suggested text</h4>
                        <p className="ai-suggested-text">{reviewResult.suggestedText || 'No suggestion available'}</p>
                    </div>
                )}
            </Modal>
            <Modal
                title="Page Translation Review"
                open={isBatchReviewVisible}
                onCancel={() => setIsBatchReviewVisible(false)}
                footer={null}
            >
                {isBatchReviewLoading && <Progress percent={50} status="active" showInfo={false} />}
                {batchReviewError && <Alert type="error" message={batchReviewError} showIcon />}
                {!isBatchReviewLoading && !batchReviewError && (
                    <List
                        bordered
                        dataSource={batchReviewResults}
                        locale={{ emptyText: 'No translations found for this page.' }}
                        renderItem={({ translationId, review }) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`Translation ${translationId} - ${review.recommendation} (${review.score}/100)`}
                                    description={review.issues?.length ? review.issues.join(' ') : 'No issues found'}
                                />
                                <span>{review.suggestedText || 'No suggestion'}</span>
                            </List.Item>
                        )}
                    />
                )}
            </Modal>
            <Modal
                title={editingTranslation ? 'Edit Translation' : 'Create Translation'}
                open={isModalVisible}
                onCancel={() => {
                    setSaveError(null);
                    setIsModalVisible(false);
                }}
                footer={null}
                >
                {saveError && <Alert type="error" message={saveError} showIcon />}
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
                    <Form.Item label="Notes" name="notes">
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
                        <Button type="primary" htmlType="submit" loading={isSaving}>
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
