import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, useNavigate, useParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { TbMovieOff } from "react-icons/tb";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), streamTimeout + 1e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region src/api/config.js
var apiKey = "9ca81c89ad84b0713b525f11339e8276";
var TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
//#endregion
//#region src/Context/MovieContext.jsx
var MovieContext = createContext();
function MovieContextProvider({ children }) {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	async function searchMovies(query) {
		if (!query) return;
		setLoading(true);
		try {
			const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=pt-BR`;
			setMovies((await axios.get(url)).data.results || []);
		} catch (error) {
			console.log(error);
			setMovies([]);
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ jsx(MovieContext.Provider, {
		value: {
			movies,
			loading,
			searchMovies
		},
		children
	});
}
//#endregion
//#region src/Context/ThemeContext.jsx
var ThemeContext = createContext({
	theme: "light",
	toggleTheme: () => {}
});
function ThemeContextProvider({ children }) {
	const [theme, setTheme] = useState("light");
	useEffect(() => {
		const savedTheme = localStorage.getItem("movie-finder-theme");
		if (savedTheme) setTheme(savedTheme);
		else {
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			setTheme(prefersDark ? "dark" : "light");
		}
	}, []);
	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
			document.body.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
			document.body.classList.remove("dark");
		}
		try {
			localStorage.setItem("movie-finder-theme", theme);
		} catch (e) {
			console.warn("Storage bloqueado no Safari");
		}
	}, [theme]);
	function toggleTheme() {
		setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
	}
	return /* @__PURE__ */ jsx(ThemeContext.Provider, {
		value: {
			theme,
			toggleTheme
		},
		children
	});
}
//#endregion
//#region src/components/NotFound.jsx
function NotFound() {
	return /* @__PURE__ */ jsxs("div", {
		className: "notfound-container",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "notfound-title",
			children: "404 - Página Não Encontrada"
		}), /* @__PURE__ */ jsx("p", {
			className: "notfound-text",
			children: "Desculpe, não conseguimos encontrar a página que você está procurando."
		})]
	});
}
//#endregion
//#region app/root.jsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links
});
var links = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css?family=Josefin+Sans|Lobster"
	}
];
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "pt-BR",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(ThemeContextProvider, { children: /* @__PURE__ */ jsx(MovieContextProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }) });
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	if (message === "404") return /* @__PURE__ */ jsx("main", {
		className: "w-full h-screen bg-gray-50 flex items-center justify-center",
		children: /* @__PURE__ */ jsx(NotFound, {})
	});
	return /* @__PURE__ */ jsxs("main", {
		className: "pt-16 p-4 container mx-auto",
		children: [
			/* @__PURE__ */ jsx("h1", { children: message }),
			/* @__PURE__ */ jsx("p", { children: details }),
			stack
		]
	});
});
//#endregion
//#region src/components/Forms.jsx
function Forms() {
	const [searchInput, setSearchInput] = useState("");
	const navigate = useNavigate();
	function handleSubmit(event) {
		event.preventDefault();
		if (searchInput.trim()) {
			navigate(`/search/${encodeURIComponent(searchInput)}`);
			setSearchInput("");
		}
	}
	return /* @__PURE__ */ jsxs("form", {
		className: "search-form",
		onSubmit: handleSubmit,
		children: [/* @__PURE__ */ jsx("input", {
			type: "text",
			placeholder: "Buscar...",
			value: searchInput,
			onChange: (e) => setSearchInput(e.target.value),
			className: "search-input"
		}), /* @__PURE__ */ jsx("button", {
			type: "submit",
			disabled: !searchInput.trim(),
			className: "search-button",
			children: /* @__PURE__ */ jsx(FaSearch, {})
		})]
	});
}
//#endregion
//#region src/components/Header.jsx
function Header() {
	const { theme, toggleTheme } = useContext(ThemeContext);
	return /* @__PURE__ */ jsxs("div", {
		className: "header-container",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "header-top",
			children: [/* @__PURE__ */ jsx("h1", {
				className: "header-title",
				children: "Movie Finder"
			}), /* @__PURE__ */ jsx("button", {
				className: "theme-toggle",
				onClick: toggleTheme,
				children: theme === "light" ? /* @__PURE__ */ jsx(FaMoon, {}) : /* @__PURE__ */ jsx(FaSun, {})
			})]
		}), /* @__PURE__ */ jsx(Forms, {})]
	});
}
//#endregion
//#region src/components/Navigation.jsx
function Navigation() {
	return /* @__PURE__ */ jsxs("nav", {
		className: "nav-container",
		children: [
			/* @__PURE__ */ jsx(NavLink, {
				to: "/search/Popular",
				className: ({ isActive }) => isActive ? "nav-link active" : "nav-link",
				children: "Popular"
			}),
			/* @__PURE__ */ jsx(NavLink, {
				to: "/search/Ação",
				className: ({ isActive }) => isActive ? "nav-link active" : "nav-link",
				children: "Ação"
			}),
			/* @__PURE__ */ jsx(NavLink, {
				to: "/search/Comédia",
				className: ({ isActive }) => isActive ? "nav-link active" : "nav-link",
				children: "Comédia"
			}),
			/* @__PURE__ */ jsx(NavLink, {
				to: "/search/Animação",
				className: ({ isActive }) => isActive ? "nav-link active" : "nav-link",
				children: "Animação"
			})
		]
	});
}
//#endregion
//#region src/components/Modal.jsx
function Modal({ isOpen, onClose, movie }) {
	if (!isOpen) return null;
	const imageUrl = movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : "https://via.placeholder.com/500x750.png?text=Sem+Poster";
	return /* @__PURE__ */ jsx("div", {
		className: "modal-overlay",
		onClick: onClose,
		children: /* @__PURE__ */ jsxs("div", {
			className: "modal-content",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ jsx("button", {
				className: "modal-close",
				onClick: onClose,
				children: "×"
			}), /* @__PURE__ */ jsxs("div", {
				className: "modal-body",
				children: [/* @__PURE__ */ jsx("img", {
					src: imageUrl,
					alt: movie.title,
					className: "modal-image"
				}), /* @__PURE__ */ jsxs("div", {
					className: "modal-info",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "modal-title",
							children: movie.title
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "modal-meta",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "modal-rating",
								children: ["⭐ ", movie.vote_average?.toFixed(1)]
							}), /* @__PURE__ */ jsxs("span", {
								className: "modal-date",
								children: [
									"Lançamento:",
									" ",
									movie.release_date ? new Date(movie.release_date).toLocaleDateString("pt-BR") : "N/A"
								]
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "modal-description",
							children: movie.overview ? movie.overview : "Descrição não disponível."
						})
					]
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/Image.jsx
function Image({ title, poster_path, vote_average, overview, release_date }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
		className: "image-card",
		onClick: () => setIsModalOpen(true),
		children: [/* @__PURE__ */ jsx("img", {
			src: poster_path ? `${TMDB_IMAGE_BASE_URL}${poster_path}` : "https://via.placeholder.com/500x750.png?text=Sem+Poster",
			alt: title,
			className: "image-poster"
		}), /* @__PURE__ */ jsxs("div", {
			className: "image-overlay",
			children: [/* @__PURE__ */ jsx("h3", {
				className: "image-title",
				children: title
			}), vote_average > 0 && /* @__PURE__ */ jsxs("span", {
				className: "image-rating",
				children: ["⭐ ", vote_average.toFixed(1)]
			})]
		})]
	}), /* @__PURE__ */ jsx(Modal, {
		isOpen: isModalOpen,
		onClose: () => setIsModalOpen(false),
		movie: {
			title,
			poster_path,
			vote_average,
			overview,
			release_date
		}
	})] });
}
//#endregion
//#region src/components/NoImage.jsx
function NoImage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "no-image-container",
		children: [
			/* @__PURE__ */ jsx(TbMovieOff, { className: "no-image-icon" }),
			/* @__PURE__ */ jsx("h2", {
				className: "no-image-title",
				children: "Nenhum filme encontrado"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "no-image-text",
				children: "Não conseguimos encontrar resultados. Tente buscar com outras palavras."
			})
		]
	});
}
//#endregion
//#region src/components/Gallery.jsx
function Gallery({ data, searchTerm }) {
	if (!data || data.length === 0) return searchTerm ? /* @__PURE__ */ jsx(NoImage, {}) : null;
	return /* @__PURE__ */ jsx("div", {
		className: "gallery-masonry",
		children: data.map((movie) => /* @__PURE__ */ jsx(Image, {
			title: movie.title,
			poster_path: movie.poster_path,
			vote_average: movie.vote_average,
			overview: movie.overview,
			release_date: movie.release_date
		}, movie.id))
	});
}
//#endregion
//#region src/components/Loader.jsx
function Loader() {
	return /* @__PURE__ */ jsx("div", {
		className: "loader-container",
		children: /* @__PURE__ */ jsx("div", { className: "loader-spinner" })
	});
}
//#endregion
//#region src/components/Container.jsx
function Container({ searchTerm }) {
	const { movies, loading, searchMovies } = useContext(MovieContext);
	useEffect(() => {
		if (searchTerm) searchMovies(searchTerm);
		else searchMovies("Popular");
	}, [searchTerm]);
	return /* @__PURE__ */ jsxs("div", {
		className: "main-container",
		children: [/* @__PURE__ */ jsx("h2", {
			className: "container-title",
			children: searchTerm ? `Filmes de ${searchTerm}` : "Filmes Populares"
		}), loading ? /* @__PURE__ */ jsx(Loader, {}) : /* @__PURE__ */ jsx(Gallery, {
			data: movies,
			searchTerm
		})]
	});
}
//#endregion
//#region app/routes/home.jsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	meta: () => meta
});
function meta() {
	return [{ title: "Movie Finder" }, {
		name: "description",
		content: "Busque seus filmes favoritos"
	}];
}
var home_default = UNSAFE_withComponentProps(function Home() {
	const { query } = useParams();
	return /* @__PURE__ */ jsxs("div", {
		className: "home-container",
		children: [
			/* @__PURE__ */ jsx(Header, {}),
			/* @__PURE__ */ jsx(Navigation, {}),
			/* @__PURE__ */ jsx(Container, { searchTerm: query })
		]
	});
});
//#endregion
//#region app/routes/search.jsx
var search_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	meta: () => meta
});
//#endregion
//#region app/routes/not-found.jsx
var not_found_exports = /* @__PURE__ */ __exportAll({ default: () => not_found_default });
var not_found_default = UNSAFE_withComponentProps(function NotFoundRoute() {
	return /* @__PURE__ */ jsx(NotFound, {});
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-DlBCI9w4.js",
		"imports": ["/assets/jsx-runtime-zuvoyUaX.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-BgvTE01x.js",
			"imports": [
				"/assets/jsx-runtime-zuvoyUaX.js",
				"/assets/ThemeContext-CBQ-44Lf.js",
				"/assets/NotFound-9jfiW9jc.js"
			],
			"css": ["/assets/root-DZyjR4bK.css", "/assets/NotFound-B8funNQa.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-D1YgL4uB.js",
			"imports": [
				"/assets/home-2GSSipAk.js",
				"/assets/jsx-runtime-zuvoyUaX.js",
				"/assets/ThemeContext-CBQ-44Lf.js"
			],
			"css": ["/assets/home-TDPYQDck.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/search": {
			"id": "routes/search",
			"parentId": "root",
			"path": "search/:query",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/search-B4h1z3L5.js",
			"imports": [
				"/assets/home-2GSSipAk.js",
				"/assets/jsx-runtime-zuvoyUaX.js",
				"/assets/ThemeContext-CBQ-44Lf.js"
			],
			"css": ["/assets/home-TDPYQDck.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/not-found": {
			"id": "routes/not-found",
			"parentId": "root",
			"path": "*",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/not-found-CLx-dd39.js",
			"imports": ["/assets/jsx-runtime-zuvoyUaX.js", "/assets/NotFound-9jfiW9jc.js"],
			"css": ["/assets/NotFound-B8funNQa.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-ab22748c.js",
	"version": "ab22748c",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = {
	"unstable_optimizeDeps": false,
	"unstable_passThroughRequests": false,
	"unstable_subResourceIntegrity": false,
	"unstable_trailingSlashAwareDataRequests": false,
	"unstable_previewServerPrerendering": false,
	"v8_middleware": false,
	"v8_splitRouteModules": false,
	"v8_viteEnvironmentApi": false
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	},
	"routes/search": {
		id: "routes/search",
		parentId: "root",
		path: "search/:query",
		index: void 0,
		caseSensitive: void 0,
		module: search_exports
	},
	"routes/not-found": {
		id: "routes/not-found",
		parentId: "root",
		path: "*",
		index: void 0,
		caseSensitive: void 0,
		module: not_found_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
