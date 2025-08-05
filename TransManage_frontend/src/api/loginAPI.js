const API_BASE = 'http://localhost:8080/api/auth'

export const loginUser = async ({ email, password }) => {
    const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.text();

    if (!response.ok) {
        throw new Error(data || 'Login failed');
    }

    return data;
};
