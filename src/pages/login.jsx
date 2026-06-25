import { useState } from "react";
import { useMutation } from "@tanstack/react-query"; // Imported useMutation from React Query
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    // ⚡ REACT QUERY MUTATION: Handles the login API lifecycle automatically
    const loginMutation = useMutation({
        mutationFn: loginUser, //  auth API function
        onSuccess: (data) => {
            // Triggered when login is successful
            console.log("Login Data:", data);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect user to the home page after successful authentication
            navigate("/");
        },
        onError: (error) => {
            // Triggered if the backend rejects the request 
            console.error("LOGIN ERROR:", error.response?.data);
        }
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 🚀 Triggers the mutation with the current form data
        loginMutation.mutate(form);
    };

    // Fallback error message if backend does not return a specific message
    const errorMessage = loginMutation.error?.response?.data?.message || "Login failed ❌";

    return (
        <>
            <section className="max-w-7xl mx-auto mt-40 px-4 py-10 flex justify-center">
                <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">

                    {/* LEFT SIDE CONTENT */}
                    <div className="space-y-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-neutral-700">
                            YumHunt
                        </h1>

                        <p className="text-gray-600 leading-7">
                            Welcome back! Login to explore delicious recipes 🍜
                            and continue your cooking journey.
                        </p>

                        <div className="space-y-3 text-gray-700">
                            <p>🔍 Discover Recipes</p>
                            <p>❤️ Access Favorites</p>
                            <p>👩‍🍳 Cook smarter</p>
                        </div>
                    </div>

                    {/* RIGHT SIDE AUTH FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-2xl border border-gray-200 rounded-2xl p-8 space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-center text-gray-700">
                            Login
                        </h2>

                        <div>
                            <label className="block mb-2 text-gray-700 font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-1 focus:ring-amber-600 outline-none"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-gray-700 font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-1 focus:ring-amber-600 outline-none"
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* loginMutation.isPending dynamically handles loading text & disables the button */}
                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full bg-amber-600 text-white py-2 rounded-xl font-semibold hover:bg-amber-700 transition disabled:bg-amber-400"
                        >
                            {loginMutation.isPending ? "Logging in..." : "Login"}
                        </button>

                        {/*  Success Alert Condition */}
                        {loginMutation.isSuccess && (
                            <p className="text-center text-sm font-semibold text-green-600">
                                Login successful ✅
                            </p>
                        )}

                        {/*  Error Alert Condition */}
                        {loginMutation.isError && (
                            <p className="text-center text-sm font-semibold text-red-600">
                                {errorMessage}
                            </p>
                        )}

                        <p className="text-center text-sm text-gray-600">
                            Don’t have an account?{" "}
                            <span
                                onClick={() => navigate("/register")}
                                className="text-amber-600 cursor-pointer hover:underline"
                            >
                                Register
                            </span>
                        </p>
                    </form>
                </div>
            </section>

            {/* NAVIGATION BACK BUTTON */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-amber-600 font-semibold border border-amber-600 mx-auto px-5 py-2 mt-10 rounded-full hover:bg-amber-600 hover:text-white transition"
            >
                <FaArrowLeft size={20} /> Back
            </button>
        </>
    );
};

export default Login;