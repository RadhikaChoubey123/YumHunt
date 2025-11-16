import emailjs from "@emailjs/browser";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

export const Contact = () => {
    const formRef = useRef();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs
            .sendForm(
                "service_xxxx",     // Service ID
                "template_xxxx",   // Template ID
                formRef.current,      // FORM reference
                "YOUR_PUBLIC_KEY"   // Public Key
            )
            .then(
                () => {
                    setLoading(false);
                    setSuccess("Message sent successfully!");
                    formRef.current.reset(); // Form reset
                },
                (error) => {
                    setLoading(false);
                    setSuccess("Oops! Something went wrong.");
                    console.error(error.text);
                }
            );
    };

    return (
        <>
            <section className="max-w-7xl mx-auto mt-40 px-4 py-10 flex justify-center ">
                <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">

                    <div className="space-y-6 ">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-neutral-700">
                            Contact Us
                        </h1>
                        <p className="text-gray-600 leading-7 ">
                            We'd love to hear from you!
                            Whether you have feedback, questions, or suggestions about our recipes,
                            feel free to reach out anytime.
                        </p>

                        <div className="space-y-3 text-gray-700">
                            <p>📧 radhikachoubey1703@gmail.com</p>
                            <p>📍 Ujjain, India</p>
                        </div>
                    </div>

                    <form
                        ref={formRef}
                        onSubmit={sendEmail}
                        className="bg-white shadow-2xl border border-gray-200 rounded-2xl p-8 space-y-6" >
                        <div>
                            <label className="block mb-2 text-gray-700 font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-1 focus:ring-amber-600 outline-none"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-1 focus:ring-amber-600 outline-none"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-gray-700 font-medium">Message</label>
                            <textarea
                                rows="4"
                                name="message"
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-amber-600 outline-none"
                                placeholder="Write your message..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-amber-600 text-white py-2 rounded-xl font-semibold hover:bg-amber-700 transition"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>

                        {success && (
                            <p className="text-green-600 text-center font-semibold">
                                {success}
                            </p>
                        )}
                    </form>
                </div>

            </section>
            <button onClick={() => navigate(-1)} className="flex  cursor-pointer  items-center gap-2 text-amber-600 font-semibold border border-amber-600 mx-auto px-5 py-2 mt-10 rounded-full hover:bg-amber-600 hover:text-white transition" >
                <FaArrowLeft size={20} /> Back
            </button>
        </>

    );
};

export default Contact;
