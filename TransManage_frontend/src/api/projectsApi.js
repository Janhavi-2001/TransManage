const API_BASE = 'http://localhost:8080/api/projects';

export const getProjects = async () => {
    try {
        const res = await fetch(API_BASE);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error; // Re-throw to handle it in the component
    }
};

export const createProject = async (project) => {
    try {
        const res = await fetch(API_BASE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

export const updateProject = async (id, project) => {
    try {
        const res = await fetch(`${API_BASE}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};

export const deleteProject = async (id) => {
    try {
        const res = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
};

export const getProjectById = async (id) => {
    try {
        const res = await fetch(`${API_BASE}/${id}`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error('Error fetching project by ID:', error);
        throw error;
    }
};