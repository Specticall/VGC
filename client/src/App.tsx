import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import MovieForm from "./pages/MovieForm";
import MovieAir from "./pages/MovieAir";
import DesignSystem from "./pages/DesignSystem";
import AdminMovies from "./pages/AdminMovies";
import Register from "./pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./lib/config";
import OrderTicket from "./pages/OrderTicket";
import { SkeletonTheme } from "react-loading-skeleton";
import Protect from "./components/general/Protect";
import ScheduleForm from "./pages/ScheduleForm";
import ToastProvider from "./components/ui/Toast";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import Checkout from "./pages/Checkout";
import Tickets from "./pages/Tickets";

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
    element: (
      <Protect>
        <AppLayout />
      </Protect>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movies/:id",
        element: <MovieDetails />,
      },
      {
        path: "movie-form/:id?",
        element: <MovieForm />,
      },
      {
        path: "schedule-form/:id?",
        element: <ScheduleForm />,
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
        path: "Tickets",
        element: <Tickets />,
      },
      {
        path: "order-ticket/:movieId",
        element: <OrderTicket />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "movies-details",
        element: <MovieDetails />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
]);
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <ToastProvider>
          <SkeletonTheme baseColor="#1E1F21" highlightColor="#2A2B35">
            <RouterProvider router={router} />
          </SkeletonTheme>
        </ToastProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}
