import { useState, useEffect } from "react";
import { searchMeals } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const Search = () => {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const navigate = useNavigate();

    // 🔥 Debounce logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
        }, 700); // 0.5 sec delay

        return () => clearTimeout(timer);
    }, [query]);

    // 🔥 React Query works on debounced value

    const { data: meals, isLoading, isError } = useQuery({
        queryKey: ["searchMeals", debouncedQuery],
        queryFn: () => searchMeals(debouncedQuery),
        enabled: !!debouncedQuery,
    });

    if (isLoading) return <p className="text-center text-2xl my-64">Loading...</p>;
    if (isError) return <p className="text-center my-64">Error fetching data</p>;

    return (
        <section className="max-w-7xl mx-auto mt-40 px-4 py-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 text-neutral-700">
                🔍 Search Recipes
            </h1>

            {/* Search Bar */}
            <div className="flex justify-center mb-10 mt-20">
                <input
                    type="text"
                    placeholder="Search for a meal..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-gray-300 rounded-l-xl px-5 py-2 w-80 md:w-3xl focus:outline-none focus:ring-1 focus:ring-amber-600"
                />

                <button
                    onClick={() => setDebouncedQuery(query.trim())}
                    className="bg-amber-600 text-white cursor-pointer px-5 py-2 rounded-r-xl hover:bg-amber-700 transition"
                >
                    Search
                </button>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 py-7 gap-5 sm:gap-12">
                {meals?.map((meals) => (
                    <div
                        key={meals.idMeal}
                        onClick={() => navigate(`/recipes/${meals.idMeal}`)}
                        className="sm:h-80 overflow-hidden bg-white shadow-2xl border-[.01rem] border-gray-300 hover:scale-105 transition duration-300 cursor-pointer"
                    >
                        <img
                            src={meals.strMealThumb}
                            alt={meals.strMeal}
                            className="w-full h-36 sm:h-48 md:h-64 object-cover"
                        />
                        <p className="text-center font-semibold py-3 px-5 text-neutral-800 truncate">
                            {meals.strMeal}
                        </p>
                    </div>
                ))}
            </div>

            {/* Back */}
            <button
                onClick={() => navigate(-1)}
                className="flex cursor-pointer items-center gap-2 text-amber-600 font-semibold border border-amber-600 mx-auto px-5 py-2 mt-10 rounded-full hover:bg-amber-600 hover:text-white transition"
            >
                <FaArrowLeft size={20} /> Back
            </button>
        </section>
    );
};
