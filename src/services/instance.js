import axios from "axios";

const BASE_URL = "http://localhost:8080/identity";

export const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
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

export async function handleApiRequest(request) {
  try {
    const response = await request();
    return response;
  } catch (err) {
    console.log(err);
    if (err.response) {
      return err.response;
    }
    return null;
  }
}

export function handleApiResponse(response, onSuccess, onFailure, onComplete) {
  if (response && response.status === 200) {
    if (onSuccess) {
      const data = response.data.data;
      onSuccess(data);
    }
  } else {
    if (onFailure) {
      let error = response.data.message;
      onFailure(error, response);
    }
  }
  if (onComplete) {
    onComplete();
  }
}
