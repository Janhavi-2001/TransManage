const API_BASE = 'http://localhost:8080/api/auth'

export const registerUser = async ({ firstName, lastName, username, email, password }) => {
    const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, username, email, password }),
    });

    const data = await response.text();

    if (!response.ok) {
        throw new Error(data || 'Registration failed');
    }

    return data;
};
