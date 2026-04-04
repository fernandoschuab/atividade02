import Forms from "./Forms";
import "./Header.css";

export default function Header() {
  return (
    <div className="header-container">
      <h1 className="header-title">Movie Finder</h1>
      <Forms />
    </div>
  );
}
