import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (response) => {
            console.log("Success Response:", response);

            setForm({ name: "", email: "", password: "" });

            setTimeout(() => navigate("/login"), 2000);
        },
        onError: (error) => {
            console.error("Full Axios Error:", error);
        }
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        registerMutation.mutate(form);
    }

    const errorMessage = registerMutation.error?.response?.data?.message || registerMutation.error?.message || "Registration failed ❌";

    return (
        <>
            <section className="max-w-7xl mx-auto mt-40 px-4 py-10 flex justify-center">
                <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">

                    {/* LEFT SIDE */}
                    <div className="space-y-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-neutral-700">
                            YumHunt
                        </h1>
                        <p className="text-gray-600 leading-7">
                            Join YumHunt and start discovering delicious recipes 🍜
                            Save your favorites and cook something amazing every day!
                        </p>
                        <div className="space-y-3 text-gray-700">
                            <p>🔍 Explore Recipes</p>
                            <p>❤️ Save Favorites</p>
                            <p>👩‍🍳 Cook with Confidence</p>
                        </div>
                    </div>

                    {/* RIGHT SIDE FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-2xl border border-gray-200 rounded-2xl p-8 space-y-6"
                    >
                        <h2 className="text-2xl font-bold text-center text-gray-700">
                            Create Account
                        </h2>

                        <div>
                            <label className="block mb-2 text-gray-700 font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-1 focus:ring-amber-600 outline-none"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-gray-700 font-medium">Email</label>
                            <input
                                type="type"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-1 focus:ring-amber-600 outline-none"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-gray-700 font-medium">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-1 focus:ring-amber-600 outline-none"
                                placeholder="Create password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={registerMutation.isPending}
                            className="w-full bg-amber-600 text-white py-2 rounded-xl font-semibold hover:bg-amber-700 transition disabled:bg-amber-400"
                        >
                            {registerMutation.isPending ? "Registering..." : "Register"}
                        </button>

                        {/* ✅ Success Alert Condition */}
                        {registerMutation.isSuccess && (
                            <p className="text-green-600 text-center font-semibold">
                                Account created successfully ✅ Redirecting...
                            </p>
                        )}

                        {/* ❌ Error Alert Condition */}
                        {registerMutation.isError && (
                            <p className="text-red-600 text-center font-semibold">
                                {errorMessage}
                            </p>
                        )}
                    </form>
                </div>
            </section>

            {/* BACK BUTTON */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-amber-600 font-semibold border border-amber-600 mx-auto px-5 py-2 mt-10 rounded-full hover:bg-amber-600 hover:text-white transition"
            >
                <FaArrowLeft size={20} /> Back
            </button>
        </>
    );
};

export default Register;