import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    withCredentials: true // Important for Cookies
});

// Function to set the access token (to be used by AuthContext)
let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

// Add a request interceptor to include the token in headers
API.interceptors.request.use((req) => {
    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
});

// Add a response interceptor to handle 401 errors (Token Expired)
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to get a new access token
                const { data } = await API.get('/auth/refresh');

                // Update the access token in memory
                setAccessToken(data.token);

                // Update the failed request's header with the new token
                originalRequest.headers.Authorization = `Bearer ${data.token}`;

                // Retry the original request
                return API(originalRequest);
            } catch (refreshError) {
                // If refresh fails (e.g., refresh token expired), logout logic handled by AuthContext or Redirect
                // We let the error propagate so AuthContext can catch it if needed, or redirect
                // Ideally, AuthContext should listen to a custom event or check this state
                console.error("Session expired, please login again.");
                // Optional: Force redirect or clear state
                // window.location.href = '/login'; 
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default API;
