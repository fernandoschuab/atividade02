import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("search/:query", "routes/search.jsx"),
  route("*", "routes/not-found.jsx"),
];
