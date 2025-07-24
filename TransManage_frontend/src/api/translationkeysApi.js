const API_BASE = 'http://localhost:8080/api/projects';

export const getTranslationKeys = async (projectId, pageId) => {
    const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}/translation-keys`);
    return await res.json();
}

export const createTranslationKey = async (projectId, pageId, translationKeyData) => {
    const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}/translation-keys`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(translationKeyData),
    });
    return await res.json();
}

export const updateTranslationKey = async (projectId, pageId, translationKeyId, translationKeyData) => {
    const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}/translation-keys/${translationKeyId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(translationKeyData),
    });
    return await res.json();
}

export const deleteTranslationKey = async (projectId, pageId, translationKeyId) => {
    const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}/translation-keys/${translationKeyId}`, {
        method: 'DELETE',
    });
    return await res.json();
}
