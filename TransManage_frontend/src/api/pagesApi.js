const API_BASE = 'http://localhost:8080/api/projects';

export const getPages = async (projectId) => {
    const res = await fetch(`${API_BASE}/${projectId}/pages`);
    return await res.json();
}

export const createPage = async (projectId, pageData) => {
    const res = await fetch(`${API_BASE}/${projectId}/pages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
    });
    return await res.json();
}

export const updatePage = async (projectId, pageId, pageData) => {
    const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
    });
    return await res.json();
}

export const deletePage = async (projectId, pageId) => {
    const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}`, {
        method: 'DELETE',
    });
    return await res.json();
}
