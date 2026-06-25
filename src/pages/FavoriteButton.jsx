import { addFavorite, removeFavorite, getFavorites } from "../api/favApi";
import { IoHeart } from "react-icons/io5";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const FavoriteButton = ({ recipeId }) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const token = localStorage.getItem("token");


    const { data: favData } = useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites,
        enabled: !!token, // Only fetch if the user is authenticated
    })

    const myFavIds = favData?.data?.favorites || favData?.data || favData?.favorites || favData || [];

    // Check if the current recipeId exists inside the user's favorites array
    const isLiked = myFavIds.some((fav) => String(fav.recipeId || fav.idMeal || fav) === String(recipeId));

    const toggleMutation = useMutation({
        mutationFn: async () => {
            if (isLiked) {
                // const backendFavItem = myFavIds.find((fav) => String(fav.recipeId || fav.idMeal || fav) === String(recipeId));
                // const deleteId = backendFavItem?._id || recipeId;
                return await removeFavorite(recipeId);
            } else {
                return await addFavorite(recipeId);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] })
        },
        onError: (error) => {
            console.error("Failed to toggle favorite status:", error.response?.data || error.message);
        }
    })
    const handleToggle = (e) => {
        e.stopPropagation();
        
        if (!token) {
            alert("Please login first to add favorites ❤️");
            navigate("/login");
            return;
        }
        toggleMutation.mutate();
    }

    return (
        <button
            onClick={handleToggle}
            disabled={toggleMutation.isPending}
            className="bg-white/90 p-2 cursor-pointer rounded-full shadow-lg hover:scale-110 transition disabled:opacity-70"
        >
            <IoHeart
                className={`text-xl transition duration-200 ${isLiked ? "text-red-600" : "text-gray-400"
                    }`}
            />
        </button>

    )
}
export default FavoriteButton