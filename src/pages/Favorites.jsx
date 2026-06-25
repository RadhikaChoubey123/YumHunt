import { useQuery, useQueries, useQueryClient, useMutation } from "@tanstack/react-query";
import { getFavorites, removeFavorite } from "../api/favApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { useShare } from "../hooks/useShare"
import { FaShareAlt } from "react-icons/fa";

const Favorites = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { copiedId, handleShare } = useShare();

    const { data: favData, isLoading: isFavIdsLoading } = useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites,
        enabled: !!token,
    });

    const myFavIds = favData?.data?.favorites || favData?.favorites || favData?.data || favData || [];


    const favoriteMealsQueries = useQueries({
        queries: myFavIds.map((fav) => {
            const recipeId = fav.recipeId || fav.idMeal || fav;
            return {
                queryKey: ["recipeDetail", recipeId],
                queryFn: async () => {

                    const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
                    return res.data?.meals?.[0] || null;
                },
                enabled: !!recipeId,
            };
        }),
    });

    // 3. Delete Logic
    const removeMutation = useMutation({
        mutationFn: removeFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        }
    });

    const handleRemove = (e, id) => {
        e.stopPropagation();
        removeMutation.mutate(id);
    };

    if (!token) return <p className="text-center mt-40 text-xl font-semibold">Please login first 🔒</p>;

    const isMealsLoading = favoriteMealsQueries.some((q) => q.isLoading);
    if (isFavIdsLoading || isMealsLoading) return <p className="text-center text-2xl font-bold my-64">Loading Favorites... ⏳</p>;

    return (
        <section className="max-w-7xl mx-auto mt-30 sm:mt-45 px-4 sm:py-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 text-neutral-700 ">My Favorites</h2>
            {myFavIds.length === 0 ? (
                <p className="text-center text-gray-500 text-lg mt-20">
                    No favorites yet 😢 Go add some recipes!
                </p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 sm:py-10 gap-5 sm:gap-13">
                    {favoriteMealsQueries.map((query) => {
                        const meal = query.data;
                        const backendFavItem = myFavIds.find((fav) => {
                            String(fav.recipeId || fav.idMeal || fav) === String(meal.idMeal)
                        })
                        const deleteId = backendFavItem?._id || backendFavItem?.recipeId || meal.idMeal;


                        if (!meal) return null;

                        return (
                            <div
                                key={meal.idMeal}
                                onClick={() => navigate(`/recipes/${meal.idMeal}`)}
                                className=" sm:h-80 overflow-hidden bg-white shadow-2xl border-[.01rem] border-gray-300 hover:scale-105 transition duration-300 cursor-pointer"
                            >
                                {/* Remove/Delete Button */}
                                <button
                                    onClick={(e) => handleRemove(e, deleteId)}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-lg font-bold p-1.5 rounded-full z-10 shadow-md transition duration-200"
                                >
                                    <RxCross1 />
                                </button>

                                <img
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    className="w-full h-36 sm:h-48 md:h-64 object-cover"
                                />

                                <p className="text-center font-semibold py-4 px-3 truncate text-neutral-800">
                                    {meal.strMeal}
                                </p>
                                <div className="absolute top-3 left-3 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white text-gray-700 hover:text-amber-600 transition cursor-pointer flex items-center justify-center"
                                    onClick={(e) => handleShare(e, "recipes", meal.idMeal)}
                                    title="Share Recipe">
                                    <FaShareAlt size={16} />
                                    {copiedId === meal.idMeal && (
                                        <span className="absolute left-10 bg-white/80  hover:bg-white text-gray-700 text-xs px-2 py-1 rounded whitespace-nowrap shadow-md">
                                            Copied!
                                        </span>
                                    )}
                                </div>
                            </div>

                        );
                    })}
                </div>
            )}
            <div className="flex justify-center mt-14">
                {/* go back */}
                <button onClick={() => navigate(-1)} className="flex cursor-pointer  items-center gap-2 text-amber-600 font-semibold border border-amber-600 mx-auto  px-5 py-2 mt-10 rounded-full hover:bg-amber-600 hover:text-white transition">
                    <FaArrowLeft size={20} /> Back</button>
            </div>
        </section>
    );
};

export default Favorites;