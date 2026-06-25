import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    return (
       
        <section className="max-w-7xl mx-auto mt-30 sm:mt-45 px-4 sm:pt-14">

            {/* 2. Header Section */}
            <div className="text-center mb-14">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-700">About Us</h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mt-10">
                    Welcome to <span className="font-semibold text-black">YumHunt.</span> — your one-stop
                    destination for discovering, cooking, and enjoying delicious recipes from all over
                    the world.
                </p>
            </div>

            {/* * 3. Mission Section  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mt-14">
                <div className="h-64 sm:h-80 overflow-hidden bg-white shadow-2xl border-[.01rem] border-gray-300 rounded">
                    <img

                        src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80"

                        alt="Aesthetic organic ingredients prepared for fresh cooking on a kitchen table"

                        className="w-full h-full object-cover object-center"

                    />
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-amber-600">Our Mission</h2>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        We believe cooking should be fun, easy, and inspiring! That’s why we bring you
                        thousands of recipes from around the world — complete with ingredients, instructions,
                        and videos. Whether you’re a beginner or a master chef, you’ll always find something
                        tasty to try.
                    </p>
                </div>
            </div>

            {/* 4. Developer Spotlight Section */}
            <div className="mt-20 bg-white shadow-2xl border-[.01rem] border-gray-300 p-8 sm:p-10 max-w-3xl mx-auto text-center rounded">
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-700 mb-2">About the Developer</h2>
                <p className="text-amber-600 font-semibold text-sm mb-4">Full Stack Web Developer</p>

                <p className="text-gray-700 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
                    This website is designed and developed by{" "}
                    <span className="font-semibold text-black">Radhika Choubey</span>, a passionate
                    <span className="font-semibold text-black"> Full Stack Web Developer</span> who loves
                    building robust APIs, secure database architectures, and seamless user experiences using
                    React.js, Node.js, Express, and MongoDB.
                </p>

                {/* Developer social links */}
                <div className="flex justify-center mt-8 gap-6 pt-6 border-t border-gray-200">
                    <a
                        href="https://github.com/RadhikaChoubey123"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 hover:text-amber-600 font-semibold text-sm transition"
                    >
                        🌐 GitHub
                    </a>
                    <div className="w-px h-5 bg-gray-300"></div>
                    <a
                        href="https://www.linkedin.com/in/radhika-choubey/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 hover:text-amber-600 font-semibold text-sm transition"
                    >
                        💼 LinkedIn
                    </a>
                </div>
            </div>

            {/* 5. Back Button */}
            <div className="flex justify-center mt-10">
                {/* go back */}
                <button onClick={() => navigate(-1)} className="flex cursor-pointer  items-center gap-2 text-amber-600 font-semibold border border-amber-600 mx-auto px-5 py-2 mt-10 rounded-full hover:bg-amber-600 hover:text-white transition">
                    <FaArrowLeft size={20} /> Back</button>
            </div>

        </section>
    );
};

export default About;