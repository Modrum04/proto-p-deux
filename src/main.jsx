import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Details from "./pages/Details.jsx";
import Discover from "./pages/Discover.jsx";
import Search from "./pages/Search.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/details/:filmid",
    element: <Details />,
  },
  {
    path: "/discover",
    element: <Discover />,
  },
  {
    path: "/search",
    element: <Search />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
