import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:6565",
    withCredentials: true
});
