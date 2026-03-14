import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "https://videotube-frontend-beta.vercel.app",
    withCredentials: true  // important for cookies/JWT
})

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true

            try {
                await axiosInstance.post("/users/refresh-token")
                return axiosInstance(originalRequest)
            } catch (refreshError) {
                window.location.href = "/"
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default axiosInstance