import React from "react";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import About from "./pages/About";
import Contact from "./pages/Contact";
// Import your page components
import Home from "./pages/Home";
import Products from "./pages/Products";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/fi" replace />,
    },
    {
      path: "/:lang",
      element: <App />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
