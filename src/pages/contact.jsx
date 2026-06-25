import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"; 
import { FaArrowLeft } from "react-icons/fa6";

export const Contact = () => {
    const formRef = useRef();
    const navigate = useNavigate();


    const emailMutation = useMutation({
        mutationFn: (formElement) => {
            return emailjs.sendForm(
                "service_39he9ks",     // Service ID
                "template_4n4x21n",   // Template ID
                formElement,          // FORM reference
                "R5iQ29Wz6Z2qKwAo2"  // Public Key
            );
        },
        onSuccess: () => {
            formRef.current.reset(); // Form clear on success
        },
        onError: (error) => {
            console.error("EmailJS Error:", error.text);
        }
    });

    const sendEmail = (e) => {
        e.preventDefault();
      
        emailMutation.mutate(formRef.current);
    };

    return (
        <>
            <section className="max-w-7xl mx-auto mt-40 px-4 py-10 flex justify-center">
                <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">

                    <div className="space-y-6">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-neutral-700">
                            Contact Us
                        </h1>
                        <p className="text-gray-600 leading-7">
                            We'd love to hear from you!
                            Whether you have feedback, questions, or suggestions about our recipes,
                            feel free to reach out anytime.
                        </p>

                        <div className="space-y-3 text-gray-700 font-medium">
                            <p>📧 radhikachoubey1703@gmail.com</p>
                            <p>📍 Ujjain, India</p>
                        </div>
                    </div>

                    <form
                        ref={formRef}
                        onSubmit={sendEmail}
                        className="bg-white shadow-2xl border border-gray-200 rounded p-8 space-y-6" 
                    >
                        <div>
                            <label className="block mb-2 text-gray-700 font-semibold text-sm">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:border-amber-600 outline-none transition font-medium"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-gray-700 font-semibold text-sm">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:border-amber-600 outline-none transition font-medium"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-gray-700 font-semibold text-sm">Message</label>
                            <textarea
                                rows="4"
                                name="message"
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:border-amber-600 outline-none transition font-medium"
                                placeholder="Write your message..."
                            ></textarea>
                        </div>

                       
                        <button
                            type="submit"
                            disabled={emailMutation.isPending}
                            className="w-full bg-amber-600 text-white py-2.5 rounded font-semibold hover:bg-amber-700 transition cursor-pointer disabled:bg-gray-400"
                        >
                            {emailMutation.isPending ? "Sending..." : "Send Message"}
                        </button>

                    
                        {emailMutation.isSuccess && (
                            <p className="text-center font-semibold text-sm text-green-600">
                                Message sent successfully! 🎉
                            </p>
                        )}

                        {emailMutation.isError && (
                            <p className="text-center font-semibold text-sm text-red-500">
                                Oops! Something went wrong.
                            </p>
                        )}
                    </form>
                </div>
            </section>

            <div className="flex justify-center mt-6 mb-14">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex cursor-pointer items-center gap-2 text-amber-600 font-semibold border border-amber-600 px-6 py-2 rounded-full hover:bg-amber-600 hover:text-white transition duration-300"
                >
                    <FaArrowLeft size={16} /> Back
                </button>
            </div>
        </>
    );
};

export default Contact;