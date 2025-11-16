import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMeals } from "../api/api";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const CategoryRecipes = () => {
  const { name } = useParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["categoryMeals", name],
    queryFn: () => fetchMeals(name),
  });

  const navigate = useNavigate();

  if (isLoading) return <p className="text-center text-2xl font-bold my-64">Loading...</p>;
  if (isError) return <p className="text-center my-64">Error fetching data</p>;

  return (
    <section className="max-w-7xl mx-auto mt-40 px-4 py-10">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 text-neutral-700">
        {name} Recipes
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  py-5 gap-5 sm:gap-12">
        {data?.map((meals) => (
          <div
            key={meals.idMeal} onClick={() => navigate(`/recipes/${meals.idMeal}`)}
            className=" sm:h-80 overflow-hidden bg-white shadow-2xl border-[.01rem] border-gray-300 hover:scale-105 transition duration-300 cursor-pointer"
          >
            <img
              src={meals.strMealThumb}
              alt={meals.strMeal}
              className="w-full h-36 sm:h-48 md:h-64 object-cover"
            />

            <p className="text-center font-semibold py-3 px-5 text-neutral-800 truncate overflow-hidden text-ellipsis whitespace-nowrap">
              {meals.strMeal}
            </p>
          </div>
        ))}
      </div>

      {/* go back */}
      <button onClick={() => navigate(-1)} className="flex cursor-pointer  items-center gap-2 text-amber-600 font-semibold border border-amber-600 mx-auto px-5 py-2 mt-10 rounded-full hover:bg-amber-600 hover:text-white transition">
        <FaArrowLeft size={20} /> Back</button>
    </section>
  );
};

export default CategoryRecipes;
