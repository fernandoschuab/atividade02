import { useParams } from "react-router";
import Header from "../../src/components/Header";
import Navigation from "../../src/components/Navigation";
import Container from "../../src/components/Container";
import "./home.css";

export function meta() {
  return [
    { title: "Movie Finder" },
    { name: "description", content: "Busque seus filmes favoritos" },
  ];
}

export default function Home() {
  const { query } = useParams();

  return (
    <div className="home-container">
      <Header />
      <Navigation />
      <Container searchTerm={query} />
    </div>
  );
}
