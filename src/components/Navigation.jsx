import { NavLink } from "react-router";
import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="nav-container">
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
