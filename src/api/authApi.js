import axios from "axios";

const API = axios.create({
    // Strict port binding with local IP address
    baseURL: "https://yumhunt-backend.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// Register function
export const registerUser = async (data) => {
    const res = await API.post("/auth/register", data);
    return res.data;
};

// Login function
export const loginUser = async (data) => {
    const res = await API.post("/auth/login", data);
    return res.data;
};