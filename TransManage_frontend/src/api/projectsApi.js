const API_BASE = 'http://localhost:8080/api/projects';

export const getProjects = async () => {
    const res = await fetch(API_BASE);
    return await res.json();
};

export const createProject = async (project) => {
    const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
    });
    return await res.json();
};

export const updateProject = async (id, project) => {
    const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
    });
    return await res.json();
};

export const deleteProject = async (id) => {
    await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
    });
};
export const getProjectById = async (id) => {
    const res = await fetch(`${API_BASE}/${id}`);
    return await res.json();
};