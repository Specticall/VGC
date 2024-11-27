import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import MovieForm from "./pages/MovieForm";
import MovieList from "./pages/MovieList";
import MovieAir from "./pages/MovieAir";
import DesignSystem from "./pages/DesignSystem";
import AdminMovies from "./pages/AdminMovies";
import Register from "./pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./lib/config";
import OrderTicket from "./pages/OrderTicket";
import { SkeletonTheme } from "react-loading-skeleton";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/design-system",
    element: <DesignSystem />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "movies",
        element: <div></div>,
      },
      {
        path: "movie-form/:id?",
        element: <MovieForm />,
      },
      {
        path: "movie-list",
        element: <MovieList />,
      },
      {
        path: "movie-air",
        element: <MovieAir />,
      },
      {
        path: "admin-movies",
        element: <AdminMovies />,
      },
      {
        path: "order-ticket",
        element: <OrderTicket />,
      },
    ],
  },
]);
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <SkeletonTheme baseColor="#1E1F21" highlightColor="#2A2B35">
          <RouterProvider router={router} />
        </SkeletonTheme>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
