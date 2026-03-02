import api from './api';

const compactPayload = (data) => {
  const payload = { ...data };

  if (!payload.date_of_birth) delete payload.date_of_birth;
  if (!payload.address) delete payload.address;
  if (!payload.bio) delete payload.bio;

  if (payload.role !== 'doctor') {
    delete payload.specialization;
    delete payload.license_number;
    delete payload.years_of_experience;
    delete payload.consultation_fee;
    delete payload.available_days;
    return payload;
  }

  if (!payload.years_of_experience) delete payload.years_of_experience;
  if (!payload.consultation_fee) delete payload.consultation_fee;
  if (!payload.available_days) delete payload.available_days;

  return payload;
};

export const authService = {
  async register(userData) {
    const response = await api.post('/accounts/register/', compactPayload(userData));
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  async login(credentials) {
    const response = await api.post('/accounts/login/', credentials);
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },
};
