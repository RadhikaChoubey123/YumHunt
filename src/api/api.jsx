import axios from "axios"

const API = axios.create(
    {
        baseURL: "https://www.themealdb.com/api/json/v1/1/",
        // timeout: 5000,
    }
)

//categories
export const getCategories = async () => {
    const res = await API.get("/categories.php");
    return res.data.categories;
}

export const fetchMeals = async (name) => {
    const res = await API.get(`/filter.php?c=${name}`)
    return res.data.meals;
}

//latest Recipes
export const latestMeals = async () => {
    const res = await API.get("/search.php?s=");
    return res.data.meals.slice(9, 18);
}

export const LRDetails = async (id) => {
    const res = await API.get(`/lookup.php?i=${id}`);
    return res.data.meals[0];
}

//recipe list
export const allMeals = async () => {
    const res = await API.get("/search.php?s=p");
    return res.data.meals;
}

//search bar
export const searchMeals = async (query) => {
    if (!query) return [];
    const res = await API.get(`/search.php?s=${query}`);
    return res.data.meals;
}