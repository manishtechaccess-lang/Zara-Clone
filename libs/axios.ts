import axios from "axios";

const api = axios.create({
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message;

    if (message === "Unauthorized") {
      return Promise.reject({
        ...error,
        isUnauthorized: true,
      });
    }

    return Promise.reject(error);
  }
);

export default api;
