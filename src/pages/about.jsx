import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const About = () => {
   const navigate= useNavigate();
    return (
        <section className="max-w-7xl mx-auto mt-40 px-4 py-10">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 text-neutral-700 ">About Us</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Welcome to <span className="font-semibold text-black"> YumHunt.</span> — your one-stop
                    destination for discovering, cooking, and enjoying delicious recipes from all over
                    the world.
                </p>
            </div>

            {/* About the App */}
            <div className="grid md:grid-cols-2 gap-10 items-center mt-16">
                <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                    alt="Cooking"
                    className="rounded-2xl shadow-lg w-full object-cover h-80"
                />

                <div>
                    <h2 className="text-3xl font-semibold text-amber-600 mb-4">Our Mission</h2>
                    <p className="text-gray-700 leading-7">
                        We believe cooking should be fun, easy, and inspiring! That’s why we bring you
                        thousands of recipes from around the world — complete with ingredients, instructions,
                        and videos. Whether you’re a beginner or a master chef, you’ll always find something
                        tasty to try.
                    </p>
                </div>
            </div>

            {/* About Developer */}
            <div className="mt-20 text-center">
                <h2 className="text-3xl font-semibold text-amber-600 mb-4">About the Developer</h2>
                <p className="text-gray-700 max-w-2xl mx-auto leading-7">
                    This website is designed and developed by{" "}
                    <span className="font-semibold text-black">Radhika Choubey</span>, a passionate
                    <span className="font-semibold text-black"> Frontend Web Developer</span> who loves
                    building user-friendly and visually appealing applications using React.js and Tailwind CSS.
                </p>

                <div className="flex justify-center mt-5 gap-6">
                    <a
                        href="https://github.com/RadhikaChoubey123"
                        target="_blank"
                        className="text-gray-600 hover:text-amber-600 hover:scale-110 transition"
                    >
                        🌐 GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/radhika-choubey/"
                        target="_blank"
                        className="text-gray-600 hover:text-amber-600 hover:scale-110 transition"
                    >
                        💼 LinkedIn
                    </a>
                </div>
            </div>
            <button onClick={() => navigate(-1)} className="flex  cursor-pointer  items-center gap-2 text-amber-600 font-semibold border border-amber-600 mx-auto px-5 py-2 mt-10 rounded-full hover:bg-amber-600 hover:text-white transition">
                            <FaArrowLeft size={20} /> Back</button>
        </section>
    );
};
export default About
