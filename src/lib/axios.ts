import axios from "axios";


const apiClient = axios.create({
  //baseURL: process.env.NODE_ENV === "production"?"https://server-production-2ee7.up.railway.app/swiftab":"http://localhost:3002/swiftab",
  baseURL:'http://78578e1782a0.ngrok-free.app/swiftab',
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: true,
});

// Attach token to API requests
apiClient.interceptors.request.use((config) => {
  const user_auth = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (user_auth) {
    config.headers.Authorization = `Bearer ${user_auth}`;
  }

  return config;
});

export default apiClient;
