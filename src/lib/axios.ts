import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3002/swiftab",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       // Map error response to ErrorResponse interface
//       const errorResponse: ErrorResponse = {
//         message: error.response.data?.message || "An error occurred",
//         statusCode: error.response.status,
//         details: error.response.data || null, // Entire response if needed
//       };
//       return Promise.reject(errorResponse);
//     } else if (error.request) {
//       // Handle no response (e.g., network issues)
//       const errorResponse: ErrorResponse = {
//         message: "No response received from the server",
//       };
//       return Promise.reject(errorResponse);
//     } else {
//       // Handle unexpected client-side errors
//       const errorResponse: ErrorResponse = {
//         message: error.message || "An unknown error occurred",
//       };
//       return Promise.reject(errorResponse);
//     }
//   }
// );

export default apiClient;
