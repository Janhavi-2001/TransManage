const API_BASE = 'http://localhost:8080/api/projects';

export const getPages = async (projectId) => {
    try {
        const res = await fetch(`${API_BASE}/${projectId}/pages`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching pages:', error);
        throw error;
    }
}

export const createPage = async (projectId, pageData) => {
    try {
        const res = await fetch(`${API_BASE}/${projectId}/pages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pageData),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error creating page:', error);
        throw error;
    }
}

export const updatePage = async (projectId, pageId, pageData) => {
    try {
        const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pageData),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error updating page:', error);
        throw error;
    }
}

export const deletePage = async (projectId, pageId) => {
    try {
        const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
    } catch (error) {
        console.error('Error deleting page:', error);
        throw error;
    }
}

export const getPageById = async (projectId, pageId) => {
    try {
        const res = await fetch(`${API_BASE}/${projectId}/pages/${pageId}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching page by ID:', error);
        throw error;
    }
};
