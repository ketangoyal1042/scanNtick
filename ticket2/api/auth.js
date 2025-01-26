import api from "../axiosConfig";

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/v1/auth/register', userData);
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/api/v1/auth/login', userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const sendOpt = async (payload) => {
  try {
    const response = await api.post('/api/v1/auth/send-otp', payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || 'sent otp failed');
  }
};

export const verifyOtp = async (payload) => {
  try {
    const response = await api.post('/api/v1/auth/verify-otp', payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response?.data?.message || 'verify otp failed');
  }
};