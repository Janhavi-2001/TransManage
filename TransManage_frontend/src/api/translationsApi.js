const API_BASE = 'http://localhost:8080/api/projects';

export const getTranslations = async (projectId, pageId, translationKeyId) => {
    try {
        const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}/translation-keys/${translationKeyId}/translations`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching translations:', error);
        throw error;
    }
}

export const createTranslation = async (projectId, pageId, translationKeyId, translationData) => {
    try {
        const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}/translation-keys/${translationKeyId}/translations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(translationData),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error creating translation:', error);
        throw error;
    }
}

export const updateTranslation = async (projectId, pageId, translationKeyId, translationId, translationData) => {
    try {
        const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}/translation-keys/${translationKeyId}/translations/${translationId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(translationData),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error updating translation:', error);
        throw error;
    }
}

export const deleteTranslation = async (projectId, pageId, translationKeyId, translationId) => {
    try {
        const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}/translation-keys/${translationKeyId}/translations/${translationId}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await res.json();
        }
    } catch (error) {
        console.error('Error deleting translation:', error);
        throw error;
    }
}

export const getTranslationById = async (projectId, pageId, translationKeyId) => {
    try {
        const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}/translation-keys/${translationKeyId}/translations`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching translation by ID:', error);
        throw error;
    }
};
