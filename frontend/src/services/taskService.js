import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging
api.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        console.error('API Error:', message);
        return Promise.reject(new Error(message));
    }
);

// Task API functions
export const getTasks = async (filters = {}) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value) {
            params.append(key, value);
        }
    });

    const queryString = params.toString();
    const url = queryString ? `/tasks?${queryString}` : '/tasks';

    return api.get(url);
};

export const getTask = async (id) => {
    return api.get(`/tasks/${id}`);
};

export const createTask = async (taskData) => {
    return api.post('/tasks', taskData);
};

export const updateTask = async (id, taskData) => {
    return api.put(`/tasks/${id}`, taskData);
};

export const updateTaskStatus = async (id, status) => {
    return api.patch(`/tasks/${id}/status`, { status });
};

export const deleteTask = async (id) => {
    return api.delete(`/tasks/${id}`);
};

export const getTaskStats = async () => {
    return api.get('/tasks/stats/summary');
};

// Health check
export const checkHealth = async () => {
    return api.get('/health');
};

export default api;
