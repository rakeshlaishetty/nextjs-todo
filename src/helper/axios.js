import axios from "axios";

// Create an Axios instance with base configuration
const apiClient = axios.create({
    baseURL: process.env.SERVER_URL,
    timeout: 30000,
});


// apiClient.interceptors.request.use(
//     (config) => {
//         // Assuming you store your token in local storage
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );


// apiClient.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             // Handle unauthorized access, e.g., redirect to login
//             console.error('Unauthorized access - redirecting to login');
//             window.location.href = '/login';
//         }
//         return Promise.reject(error);
//     }
// );

export default apiClient;
