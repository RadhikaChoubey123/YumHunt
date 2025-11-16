import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/api";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories
    });
    console.log(data);

    const navigate = useNavigate();

    const allowedCategories = ["Vegetarian","Pasta","Vegan", "Dessert","Breakfast" ,"Miscellaneous", "Side", "Starter"];
    const filtered = data?.filter(cat =>
        allowedCategories.includes(cat.strCategory)
    ) ?? [];

    if (isLoading) return <p className="text-center  mt-10">Loading...</p>;
    if (isError) return <p className="text-center mt-10">Error fetching data</p>;

    return (
        <section className="w-full max-w-6xl mx-auto py-14 px-4">
            <h3 className="text-amber-600 text-lg sm:text-xl font-semibold font-serif text-center">
                Choose a Category
            </h3>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-700 text-center mt-2">
                Recipe Categories
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7  mt-14 place-items-center">
                {filtered.slice(0, 8).map((cat) => (
                    <div
                        key={cat.idCategory} onClick={() => navigate(`/category/${cat.strCategory}`)} className="cursor-pointer group flex flex-col items-center">
                        <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-transparent bg-gray-50">
                            <img
                                src={cat.strCategoryThumb}
                                alt={cat.strCategory}
                                className="w-full h-full object-cover group-hover:scale-110 transition"
                            />
                        </div>
                        <p className="text-center font-semibold mt-2 text-sm sm:text-base">
                            {cat.strCategory}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
