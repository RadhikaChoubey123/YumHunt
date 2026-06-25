import axios from "axios";
const API = axios.create({
    baseURL: "http://localhost:5001/api"
})
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})

export const addFavorite = (id) => API.post("/favorites", { recipeId: id });
export const getFavorites = () => API.get("/favorites");
export const removeFavorite = (id) => API.delete(`/favorites/${id}`);
