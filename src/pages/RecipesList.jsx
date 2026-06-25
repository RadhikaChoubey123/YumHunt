import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { allMeals } from "../api/api";
import { FaArrowLeft } from "react-icons/fa6";
import FavoriteButton from "./FavoriteButton";
import { useShare } from "../hooks/useShare";
import { FaShareAlt } from "react-icons/fa";
import Pagination from "../components/Pagination";
import { useState } from "react";

export const RecipesList = () => {
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["allMeals"],
    queryFn: allMeals,
    placeholderData: keepPreviousData,
  });

  // 🌟 Math Calculation
  const totalPages = Math.ceil((data?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const displayedMeals = data?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];

  console.log(data);
  const navigate = useNavigate();
  const { copiedId, handleShare } = useShare();

  if (isLoading) return <p className="text-center text-2xl font-bold my-64">Loading... </p>;
  if (isError) return <p className="text-center mt-60">Error fetching data ❌</p>;

  return (
    <section className="max-w-7xl mx-auto mt-30 sm:mt-45 px-4 sm:pt-14">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 text-neutral-700"> Recipes</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 sm:py-10 gap-5 sm:gap-13">

        {displayedMeals?.map((meals) => (
          <div
            key={meals.idMeal}
            onClick={() => navigate(`/recipes/${meals.idMeal}`)}
            className=" sm:h-80 overflow-hidden bg-white shadow-2xl border-[.01rem] border-gray-300 hover:scale-105 transition duration-300 cursor-pointer" >

            <img
              src={meals.strMealThumb}
              alt={meals.strMeal}
              className="w-full h-36 sm:h-48 md:h-64 object-cover" />

            <p className="text-center font-semibold py-3 px-5 text-neutral-800 truncate overflow-hidden text-ellipsis whitespace-nowrap">
              {meals.strMeal}</p>

            <div
              className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
              <FavoriteButton recipeId={meals.idMeal} />
            </div>

            <div
              className="absolute top-3 left-3 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white text-gray-700 hover:text-amber-600 transition cursor-pointer flex items-center justify-center"
              onClick={(e) => handleShare(e, "recipes", meals.idMeal)}
              title="Share Recipe"
            >
              <FaShareAlt size={16} />
              {copiedId === meals.idMeal && (
                <span className="absolute left-10 bg-white/80 hover:bg-white text-gray-700 text-xs px-2 py-1 rounded whitespace-nowrap shadow-md">
                  Copied!
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🌟 Pagination Component Outside the loop */}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />

      <div className="flex justify-center mt-14 ">
        <button
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-2 text-amber-600 font-semibold border border-amber-600 mx-auto px-5 py-2 mt-10 rounded-full hover:bg-amber-600 hover:text-white transition"
        >
          <FaArrowLeft size={20} /> Back
        </button>
      </div>
    </section>
  );
};