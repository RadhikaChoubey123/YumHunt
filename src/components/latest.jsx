import { useQuery } from "@tanstack/react-query"
import { latestMeals } from "../api/api"
import { useNavigate } from "react-router-dom"

const LatestMeals = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["latestMeals"],
        queryFn: latestMeals
    })
    console.log(data);
    const navigate = useNavigate();

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (isError) return <p className="text-center mt-10">Error fetching data</p>;

    return (
        <section className="w-full max-w-6xl mx-auto py-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-700 text-center">
                Latest Recipes
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 px-6  sm:px-1  md:grid-cols-3 gap-8 sm:gap-12  mt-16">
                {data?.map((meals) => (
                    <div key={meals.idMeal} className=" h-92 sm:h-104 overflow-hidden  bg-white  shadow-2xl border-[.01rem] border-gray-300 hover:scale-105 transition duration-300 cursor-pointer">
                        <img src={meals.strMealThumb} alt={meals.strMeal} className="w-full h-40 sm:h-48 md:h-56 object-cover object-center" />
                        <p className="text-xl  font-semibold py-4 px-7  truncate overflow-hidden text-ellipsis whitespace-nowrap">{meals.strMeal}</p>
                        <p className="text-sm text-gray-600  px-7 line-clamp-2">
                            {meals.strInstructions?.slice(0, 70)}...
                        </p>
                        <div className="px-7 mt-6 py-1">
                            <button onClick={() => navigate(`/recipes/${meals.idMeal}`)} className="  bg-amber-600 cursor-pointer hover:bg-amber-700  text-white px-3 py-2 rounded text-sm font-semibold">View Details →</button>
                        </div>
                    </div>
                ))}
            </div>


        </section>
    )
}
export default LatestMeals
