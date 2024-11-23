import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./pages/Dashboard";
import MovieForm from "./pages/MovieForm";
import MovieList from "./pages/MovieList";
import MovieAir from "./pages/MovieAir";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
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
        path: "movie-form",
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
    ],
  },
]);
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
