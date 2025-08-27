import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:3000",
    timeout: 10000,
    withCredentials: true,
})

axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    
    // Check if the error object contains a response from the server
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx.
      const status = error.response.status;

      console.error(`API Error: Status ${status}`, error.response.data);

      switch (status) {
        case 400:
          // Bad Request: e.g., validation errors
          // You could display a notification here.
          console.error("Error 400: Invalid data provided.");
          break;
        case 401:
          // Unauthorized: e.g., token expired or invalid
          // You could redirect the user to the login page.
          console.error("Error 401: Unauthorized. Please log in again.");
          // Example: window.location.href = '/login';
          break;
        case 404:
          // Not Found: e.g., the requested resource does not exist
          console.error("Error 404: The requested resource was not found.");
          break;
        case 500:
          // Server Error
          console.error("Error 500: An internal server error occurred.");
          break;
        default:
          console.error("An unexpected error occurred.");
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser
      console.error("Network Error: No response received from the server. Check your internet connection or the server's availability.");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error during request setup:", error.message);
    }

    // It's crucial to return a rejected promise so the calling component's catch block
    // can still handle the error.
    return Promise.reject(error);
  }
);

export default axiosInstance;