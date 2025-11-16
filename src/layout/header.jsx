import { NavLink, useNavigate } from "react-router-dom"
import logo from "../assets/logo.jpg"
import { IoMenuSharp } from "react-icons/io5";
import { useState } from "react"
import { GoSearch } from "react-icons/go";

export const Header = () => {

    const navigate = useNavigate();

    const [isOpen, setIsopen] = useState(false);
    return (
        <header className=" h-40 w-full fixed top-0 left-0 z-50 bg-white shadow-md cursor-pointer">
            {/* Logo */}
            <div className="flex justify-center bg-[#faf6eb] pt-2">
                <img src={logo} alt="logo" className="w-36  h-24 px-5 py-1" />
            </div>

            {/* Desktop Nav */}
            <nav className="hidden sm:flex justify-end sm:gap-90 px-10  bg-white py-4 text-[1.05rem] ">
                <ul className="flex gap-10 text-gray-600 ">
                    <li className="hover:text-amber-600 hover:scale-110"><NavLink to="/">Home</NavLink></li>
                    <li className="hover:text-amber-600 hover:scale-110"><NavLink to="/recipesList">Recipes</NavLink></li>
                    <li className="hover:text-amber-600 hover:scale-110"><NavLink to="/about">About</NavLink></li>
                    <li className="hover:text-amber-600 hover:scale-110"><NavLink to="/contact">Contact</NavLink></li>
                </ul>
                <div className=" mx-20">
                    <GoSearch onClick={() => navigate("/search")} className="text-2xl hover:scale-110 text-amber-600" />
                </div>
            </nav>

            {/* Mobile Menu Button */}

            <button onClick={() => setIsopen(!isOpen)} className="sm:hidden transition-all duration-300  fixed left-1/2 -translate-x-1/2  text-4xl z-50 cursor-pointer py-2 " > <IoMenuSharp /></button>
            {/* Mobile Nav */}
            <nav
                className={`sm:hidden bg-white transition-all cursor-pointer duration-300 ${isOpen ? "max-h-66 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                <ul className="flex flex-col items-center gap-5 py-7 pt-12 text-[1.01rem] text-gray-600">
                    <li className="hover:text-amber-600 hover:scale-110"><NavLink to="/" onClick={() => setIsopen(false)}>Home</NavLink></li>
                    <li className="hover:text-amber-600 hover:scale-110"><NavLink to="/recipesList" onClick={() => setIsopen(false)}>Recipes</NavLink></li>
                    <li className="hover:text-amber-600 hover:scale-110"><NavLink to="/about" onClick={() => setIsopen(false)}>About</NavLink></li>
                    <li className="hover:text-amber-600 hover:scale-110"><NavLink to="/contact" onClick={() => setIsopen(false)}>Contact</NavLink></li>
                    <li className="sm:hidden flex justify-end px-10 " onClick={() => setIsopen(false)}>
                        <GoSearch onClick={() => navigate("/search")} className="text-2xl hover:scale-110 text-amber-600 " />
                    </li>
                </ul>
            </nav>

        </header>

    )
}