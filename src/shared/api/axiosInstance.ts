import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    const body = response.data;

    if (!body.success) {
      return Promise.reject(body);
    }

    return body.data;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;