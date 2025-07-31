const API_BASE = 'http://localhost:8080/api/projects';

export const getTranslationKeys = async (projectId, pageId) => {
    try {
        const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}/translation-keys`);
        if (!res.ok) {
            throw new Error(`Error fetching translation keys: ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Failed to fetch translation keys:', error);
    }
}

export const createTranslationKey = async (projectId, pageId, translationKeyData) => {
    try {
        const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}/translation-keys`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(translationKeyData),
        });
        if (!res.ok) {
            throw new Error(`Error creating translation key: ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Failed to create translation key:', error);
    }
}

export const updateTranslationKey = async (projectId, pageId, translationKeyId, translationKeyData) => {
    try {
        const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}/translation-keys/${translationKeyId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(translationKeyData),
    });
        if (!res.ok) {
            throw new Error(`Error updating translation key: ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Failed to update translation key:', error);
    }
}

export const deleteTranslationKey = async (projectId, pageId, translationKeyId) => {
    try {
        const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}/translation-keys/${translationKeyId}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            throw new Error(`Error deleting translation key: ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Failed to delete translation key:', error);
    }
}
