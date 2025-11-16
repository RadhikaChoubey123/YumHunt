import { LRDetails } from "../api/api"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

export const LRDetail = () => {
    const { id } = useParams();
    const { data: meals, isError, isLoading } = useQuery({
        queryKey: ["LRDetail", id],
        queryFn: () => LRDetails(id),
    });

    const navigate = useNavigate();

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
            {/* Banner */}
            <div className="relative h-40 sm:h-72 md:h-80 w-full mb-7">
                <img
                    src={meals.strMealThumb}
                    alt={meals.strMeal}
                    className="h-full w-full object-cover brightness-45"
                />

                <div className="absolute inset-0 z-10 flex justify-center items-center px-4 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white px-4">
                        {meals.strMeal}
                    </h1>
                </div>
            </div>

            {/* Main 2-Column Layout */}
            <div className="flex flex-col lg:flex-row justify-start gap-9 lg:gap-10 mx-4 md:mx-10 lg:mx-32">

                {/* Left Section */}
                <div>
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
                        className="h-98 sm:h-130 w-full lg:w-200 mt-8 object-center"
                    />
                </div>

                {/* Right Section: Ingredients */}
                <div className="w-full lg:w-100  py-5 shadow-2xl border border-gray-200">
                    <h2 className="text-3xl font-bold py-4 text-center border-b border-neutral-300">
                        Main Ingredients
                    </h2>
                    <ul className="list-disc px-6 sm:px-12 py-5 space-y-3 text-gray-600">
                        {ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

            </div>

            {/* Instructions */}
            <div className="md:mx-10 mx-5 lg:mx-32 py-8">
                <h3 className="text-4xl font-bold my-5">Instructions</h3>
                <p className="text-gray-600 leading-7">
                    {meals.strInstructions}
                </p>
            </div>

            {/* YouTube */}
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


{/* go back */}
            <button onClick={() => navigate(-1)} className="flex  cursor-pointer  items-center gap-2 text-amber-600 font-semibold border border-amber-600 mx-auto px-5 py-2 mt-10 rounded-full hover:bg-amber-600 hover:text-white transition" >
                <FaArrowLeft size={20} /> Back
            </button>
        </section>
    );
};
