import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 bg-cover bg-center bg-no-repeat text-white p-6 sm:p-10 bg-[url('/bg.jpeg')]">

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Nav Menu */}
      <nav className="relative z-10">
        <ul className="flex justify-center gap-6 sm:gap-12 text-sm sm:text-base font-medium">
          <li>
            <NavLink
              to="/"
              className="hover:text-amber-600 transition"  >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipesList"
              className="hover:text-amber-600 transition"
            >
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="hover:text-amber-600 transition"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="hover:text-amber-600 transition "
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Social Media */}
      <div className="relative z-10 flex justify-center items-center gap-6 mt-6 py-2 text-3xl">
        <a
          href="https://github.com/RadhikaChoubey123"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-300 hover:text-amber-600 hover:scale-110 transition"
        >
          <IoLogoGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/radhika-choubey"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-300 hover:text-amber-600 hover:scale-110 transition"
        >
          <FaLinkedin />
        </a>
      </div>

      {/* Copyright */}
      <p className="relative z-10 text-center mt-4 text-xs sm:text-sm tracking-wide">
        © {year} <span className="text-amber-500">YumHunt</span>. All Rights Reserved.
      </p>
    </footer>
  );
};
