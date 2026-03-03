import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// 🔥 요청 보낼 때 자동으로 토큰 붙이기
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);