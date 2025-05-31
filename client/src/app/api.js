import axios from 'axios';

const API_URL = 'http://localhost:5001/service';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
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

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  signup: (userData) => api.post('/user/signup', userData),
  activateEmail: (activationToken) => api.post('/user/activation', { activation_token: activationToken }),
  signin: (credentials) => api.post('/user/signin', credentials),
  getUserInfo: () => api.get('/user/user-infor'),
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
};

// Todo API calls
export const todoAPI = {
  getAllTodos: () => api.get('/todo/get_all'),
  createTodo: (todoData) => api.post('/todo/add_todo', todoData),
  updateTodo: (id, todoData) => api.patch(`/todo/update_todo/${id}`, todoData),
  deleteTodo: (id) => api.delete(`/todo/delete_todo/${id}`),
};

export default api; 
