import axios from "axios";
import { API_BASE_URL } from "../utils/shared";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

/** Tự động set Content-Type dựa trên dữ liệu gửi đi */
axiosClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // Không set Content-Type — để axios tự động set multipart/form-data kèm boundary
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
