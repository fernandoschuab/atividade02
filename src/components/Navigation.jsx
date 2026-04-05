import { NavLink } from "react-router";
import { FaHeart } from "react-icons/fa";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="nav-container">
      <NavLink
        to="/search/Favoritos"
        title="Meus Favoritos"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        style={{ display: "flex", alignItems: "center", gap: "6px" }}
      >
        <FaHeart size={18} />
      </NavLink>
      <NavLink
        to="/search/Popular"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Popular
      </NavLink>
      <NavLink
        to="/search/Ação"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Ação
      </NavLink>
      <NavLink
        to="/search/Comédia"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Comédia
      </NavLink>
      <NavLink
        to="/search/Animação"
        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
        Animação
      </NavLink>
    </nav>
  );
}
