import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  withCredentials: true, 
});

// Sign up
export const signUp = (data) => api.post('/signup', data);

// Login
export const login = (data) => api.post('/login', data);

// Logout
export const logout = () => api.post('/logout');

// Fetch all users
export const getAllUsers = () => api.get('/users');

// Update user
export const updateUser = (id, data) => api.put(`/users/${id}`, data);

// Delete user
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Add inviteUser function
export const inviteUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/invite`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to invite user");
  }
};