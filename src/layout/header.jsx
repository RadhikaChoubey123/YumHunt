import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5"; 
import { GoSearch } from "react-icons/go";
import { useState } from "react";

export const Header = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [isOpen, setIsopen] = useState(false);
  const [open, setOpen] = useState(false); 

  const handleLogout = () => {
    localStorage.clear();
    setOpen(false);
    setIsopen(false);
    navigate("/login");
  };

  return (
    
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md flex flex-col">
      
     
      <div className="flex justify-between sm:justify-center items-center bg-[#faf6eb] px-5 py-3">
       
        <div className="w-10 sm:hidden"></div>
        
        <img src={logo} alt="logo" className="w-32 h-16 sm:w-36 sm:h-20 object-contain cursor-pointer" onClick={() => navigate("/")} />
        
        
        <button
          onClick={() => setIsopen(!isOpen)}
          className="sm:hidden text-3xl text-neutral-700 cursor-pointer p-1"
        >
          {isOpen ? <IoCloseSharp /> : <IoMenuSharp />}
        </button>
      </div>

    
      <nav className="hidden sm:flex justify-between items-center px-10 bg-white py-3 text-[1.05rem] border-t border-gray-100">
        
       
        <ul className="flex gap-8 text-gray-600 items-center font-medium">
          <li className="hover:text-amber-600 hover:scale-105 transition-transform">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-amber-600 font-semibold" : ""}>Home</NavLink>
          </li>
          <li className="hover:text-amber-600 hover:scale-105 transition-transform">
            <NavLink to="/recipesList" className={({ isActive }) => isActive ? "text-amber-600 font-semibold" : ""}>Recipes</NavLink>
          </li>
          <li className="hover:text-amber-600 hover:scale-105 transition-transform">
            <NavLink to="/about" className={({ isActive }) => isActive ? "text-amber-600 font-semibold" : ""}>About</NavLink>
          </li>
          <li className="hover:text-amber-600 hover:scale-105 transition-transform">
            <NavLink to="/contact" className={({ isActive }) => isActive ? "text-amber-600 font-semibold" : ""}>Contact</NavLink>
          </li>
          <li className="hover:text-amber-600 hover:scale-105 transition-transform">
            <NavLink to="/favorites" className={({ isActive }) => isActive ? "text-amber-600 font-semibold" : ""}>Favorites</NavLink>
          </li>
        </ul>

        {/* Desktop Controls */}
        <div className="flex items-center gap-6">
          <GoSearch
            onClick={() => navigate("/search")}
            className="text-2xl cursor-pointer hover:scale-110 text-amber-600 transition"
            title="Search Recipes"
          />

          {!token ? (
            <button
              className="hover:text-amber-600 font-medium cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          ) : (
            <div className="relative">
              {/* Profile Pill Trigger */}
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 cursor-pointer bg-neutral-50 px-3 py-1.5 rounded-full hover:bg-neutral-100 transition select-none"
              >
                <div className="w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {user?.name ? user.name.trim()[0].toUpperCase() : "U"}
                </div>
                <span className="text-gray-700 font-medium text-sm">
                  {user?.name?.split(" ")[0]} {/* First name only for clean desktop space */}
                </span>
              </div>

              {/* Profile Action Panel Menu Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-neutral-800 rounded-xl shadow-xl border border-neutral-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <button
                    onClick={() => { navigate("/profile"); setOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 transition"
                  >
                    My Profile
                  </button>
                  <hr className="border-neutral-100 my-1" />
                  
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* 3. 📱 MOBILE DROPDOWN NAVIGATION */}
      <nav
        className={`sm:hidden bg-white border-t border-gray-100 transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-112 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col items-center gap-5 py-6 font-medium text-gray-600">
          <li>
            <NavLink to="/" onClick={() => setIsopen(false)} className={({ isActive }) => isActive ? "text-amber-600 font-semibold" : ""}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/recipesList" onClick={() => setIsopen(false)} className={({ isActive }) => isActive ? "text-amber-600 font-semibold" : ""}>Recipes</NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={() => setIsopen(false)} className={({ isActive }) => isActive ? "text-amber-600 font-semibold" : ""}>About</NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setIsopen(false)} className={({ isActive }) => isActive ? "text-amber-600 font-semibold" : ""}>Contact</NavLink>
          </li>
          <li>
            <NavLink to="/favorites" onClick={() => setIsopen(false)} className={({ isActive }) => isActive ? "text-amber-600 font-semibold" : ""}>Favorites</NavLink>
          </li>
          
          <hr className="w-1/2 border-gray-100" />

          {/* Mobile Conditional User Panel */}
          {!token ? (
            <button
              onClick={() => { navigate("/login"); setIsopen(false); }}
              className="text-amber-600 font-semibold"
            >
              Login
            </button>
          ) : (
            <>
              <li className="text-amber-600 font-bold bg-amber-50/60 px-4 py-1 rounded-full text-sm">
                👤 {user?.name}
              </li>
              <li>
                <button onClick={() => { navigate("/profile"); setIsopen(false); }} className="hover:text-neutral-900">Profile</button>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-600 font-semibold">Logout</button>
              </li>
            </>
          )}

          <li className="pt-2">
            <GoSearch
              onClick={() => { navigate("/search"); setIsopen(false); }}
              className="text-2xl text-amber-600 cursor-pointer"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};