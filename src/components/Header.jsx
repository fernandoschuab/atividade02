import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";
import Forms from "./Forms";
import "./Header.css";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="header-container">
      <div className="header-top">
        <h1 className="header-title">Movie Finder</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
      <Forms />
    </div>
  );
}
