import "./styles/index.css";
import "./i18n";

import React, { Suspense } from "react";

import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading M.A.T-Fish...</p>
    </div>
  </div>
);

const logError = (error, errorInfo) => {
  console.error("Application Error:", error);
  console.error("Error Info:", errorInfo);
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We apologize for the inconvenience. Please try refreshing the
              page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/fi" replace />,
    },
    {
      path: "/:lang",
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "products",
          element: <ProductsPage />,
        },
        {
          path: "about",
          element: <AboutPage />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/fi" replace />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

const container = document.getElementById("root");
if (!container) {
  throw new Error(
    "Failed to find the root element. The app cannot be initialized."
  );
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <Suspense fallback={<LoadingScreen />}>
          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
              v7_fetcherPersist: true,
              v7_normalizeFormMethod: true,
              v7_partialHydration: true,
              v7_skipActionErrorErrorRevalidation: true,
            }}
          />
        </Suspense>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

window.addEventListener("unhandledrejection", (event) => {
  logError(event.reason, "Unhandled Promise Rejection");
});

window.addEventListener("error", (event) => {
  logError(event.error, "Uncaught Error");
});

const reportWebVitals = (metric) => {
  console.log(metric);
};

reportWebVitals();
