import { LRDetails } from "../api/api"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useShare } from "../hooks/useShare";
import { FaShareAlt } from "react-icons/fa";

export const LRDetail = () => {
    const { id } = useParams();
    const { data: meals, isError, isLoading } = useQuery({
        queryKey: ["LRDetail", id],
        queryFn: () => LRDetails(id),
    });

    const navigate = useNavigate();
    const { copiedId, handleShare } = useShare();

    if (isLoading) return <p className="text-center text-2xl font-bold my-64 ">Loading...</p>;
    if (isError) return <p className="text-center my-64">Error fetching data</p>;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meals[`strIngredient${i}`];
        const measure = meals[`strMeasure${i}`];
        if (ingredient) ingredients.push(`${ingredient} - ${measure}`);
    }

    return (
        <section className="mx-auto mt-40 w-full">
            {/* Banner Section */}
            <div className="relative h-40 sm:h-72 md:h-80 w-full mb-7">
                <img
                    src={meals.strMealThumb}
                    alt={meals.strMeal}
                    className="h-full w-full object-cover brightness-45"
                />

                {/* Banner Content Wrapper */}
                <div className="absolute inset-0 z-10 flex flex-col justify-center items-center px-4 text-center space-y-4">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white px-4 tracking-tight">
                        {meals.strMeal}
                    </h1>

                    {/* 🔗 Share Button Overlay on Banner */}
                    <div className="relative">
                        <button
                            onClick={(e) => handleShare(e, "recipes", id)}
                            className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-1.5 rounded text-sm font-semibold hover:bg-white hover:text-black cursor-pointer transition flex items-center gap-2 shadow-md"
                        >
                            <FaShareAlt  size={16} /> Share Recipe
                        </button>

                        {/* Toast Notification */}
                        {copiedId === id && (
                            <span className="absolute left-1/2 -translate-x-1/2 -top-9 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-md font-medium">
                                Link Copied!
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Main 2-Column Layout */}
            <div className="flex flex-col lg:flex-row justify-start gap-9 lg:gap-10 mx-4 md:mx-10 lg:mx-32">
                {/* Left Section  */}
                <div className="flex-1">
                    <div className="bg-neutral-200/40 flex flex-wrap gap-4 py-6 px-4 sm:px-6 text-sm sm:text-base">
                        {meals.strTags?.split(",").map((tag) => (
                            <span key={tag} className="font-semibold text-amber-600">
                                # {tag}
                            </span>
                        ))}

                        <p className="text-gray-600">
                            <span className="font-semibold text-black">Category :</span>{" "}
                            {meals.strCategory}
                        </p>

                        <p className="text-gray-600">
                            <span className="font-semibold text-black">Area :</span> {meals.strArea}
                        </p>
                    </div>

                    <img
                        src={meals.strMealThumb}
                        alt={meals.strMeal}
                        className="h-98 sm:h-130 w-full mt-8 object-cover object-center"
                    />
                </div>

                {/* Right Section: Ingredients */}
                <div className="w-full lg:w-100 py-5 shadow-2xl border border-gray-200 bg-white">
                    <h2 className="text-3xl font-bold py-4 text-center border-b border-neutral-300">
                        Main Ingredients
                    </h2>
                    <ul className="list-disc px-8 sm:px-12 py-5 space-y-3 text-gray-600">
                        {ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Instructions Segment */}
            <div className="mx-4 md:mx-10 lg:mx-32 py-8">
                <h3 className="text-4xl font-bold my-5">Instructions</h3>
                <p className="text-gray-600 leading-7 whitespace-pre-line">
                    {meals.strInstructions}
                </p>
            </div>

            {/* YouTube Section */}
            {meals.strYoutube && (
                <div className="mt-10 mx-4 md:mx-10 lg:mx-32">
                    <h3 className="text-4xl font-bold pb-8">Watch Recipe</h3>
                    <iframe
                        width="100%"
                        height="250"
                        className="rounded-xl shadow-lg sm:h-80 md:h-[450px]"
                        src={`https://www.youtube.com/embed/${meals.strYoutube.slice(-11)}`}
                        allowFullScreen
                    ></iframe>
                </div>
            )}

          
            <div className="flex justify-center mt-12 mb-10">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex cursor-pointer items-center gap-2 text-amber-600 font-semibold border border-amber-600 px-6 py-2 rounded-full hover:bg-amber-600 hover:text-white transition duration-300"
                >
                    <FaArrowLeft size={16} /> Back
                </button>
            </div>
        </section>
    );
};