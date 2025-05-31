import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  signup: (userData) => api.post('/signup', userData),
  activateEmail: (activationToken) => api.post('/activation', { activation_token: activationToken }),
  signin: (credentials) => api.post('/signin', credentials),
  getUserInfo: () => api.get('/user-infor'),
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
};

// Todo API calls
export const todoAPI = {
  getAllTodos: () => api.get('/get_all'),
  createTodo: (todoData) => api.post('/add_todo', todoData),
  updateTodo: (id, todoData) => api.patch(`/update_todo/${id}`, todoData),
  deleteTodo: (id) => api.delete(`/delete_todo/${id}`),
};

export default api; 
