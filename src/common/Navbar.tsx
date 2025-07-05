import { ModeToggle } from "@/components/mode-toggle";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navMenu = (
    <>
      <NavLink
        to="/books"
        className={({ isActive }) =>
          cn(
            "block px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300",
            isActive
              ? "bg-indigo-600 text-white shadow-lg"
              : "text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-700/30"
          )
        }
      >
        All Books
      </NavLink>
      <NavLink
        to="/create-book"
        className={({ isActive }) =>
          cn(
            "block px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300",
            isActive
              ? "bg-indigo-600 text-white shadow-lg"
              : "text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-700/30"
          )
        }
      >
        Add Book
      </NavLink>
      <NavLink
        to="/borrow-summary"
        className={({ isActive }) =>
          cn(
            "block px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300",
            isActive
              ? "bg-indigo-600 text-white shadow-lg"
              : "text-indigo-700 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-700/30"
          )
        }
      >
        Borrow Summary
      </NavLink>
    </>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur-md border-b border-indigo-200 dark:bg-gray-900/40 dark:border-indigo-700 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 select-none"
          aria-label="R.Library Home"
        >
          <h1 className=" mr-2 text-indigo-700 dark:text-indigo-300 font-extrabold text-3xl tracking-tight hover:tracking-wider transition-all duration-300">
            BookStore
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex gap-6">{navMenu}</div>

        {/* Mode Toggle */}
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />

          {/* Mobile Hamburger */}
          <button
            className="sm:hidden p-2 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-700 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-indigo-700 dark:text-indigo-300" />
            ) : (
              <Menu className="w-6 h-6 text-indigo-700 dark:text-indigo-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "sm:hidden bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border-t border-indigo-200 dark:border-indigo-700 shadow-inner absolute w-full left-0 transition-transform duration-300 ease-in-out origin-top",
          menuOpen ? "scale-y-100" : "scale-y-0 pointer-events-none"
        )}
        style={{ transformOrigin: "top" }}
      >
        <div className="flex flex-col gap-2 py-4 px-6">{navMenu}</div>
      </div>
    </nav>
  );
};

export default Navbar;
