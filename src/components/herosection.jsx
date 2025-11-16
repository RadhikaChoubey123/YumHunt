import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import img7 from "../assets/img7.png"
import img5 from "../assets/img5.png"
import img6 from "../assets/img6.png"
import img4 from "../assets/img4.png"

const slides = [
    { img: img7, title: "Mumbai’s Iconic Flavor!", desc: "Spicy. Buttery. Irresistible. 😋" },
    { img: img5, title: "Crispy South-Indian Delight", desc: "Crunchy outside, soft inside 😍" },
    { img: img6, title: "Craving Pizza?", desc: "Explore Cheesy Goodness 🍕" },
    { img: img4, title: "Sweetness Unlimited!", desc: "Celebrate every moment 🍬🎉" },
];

export const HeroSlider = () => {
    return (
        <section className="w-full h-[300px] sm:h-[650px] mt-40 sm:mt-40">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true }}
                className="w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            {/* Image */}
                            <img
                                src={slide.img}
                                alt=""
                                className="w-full h-full object-cover brightness-60"
                            />

                            {/* Text Layer */}
                            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white px-4 text-center">
                                <h2 className="text-2xl sm:text-5xl font-bold drop-shadow-lg">
                                    {slide.title}
                                </h2>
                                <p className="text-sm sm:text-xl mt-2 drop-shadow-lg">
                                    {slide.desc}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};
