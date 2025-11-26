import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import Conversation from "./pages/conversation";

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "",
          element: <Layout />,
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
            {
              path: "conversation",
              element: <Conversation />,
            },
          ],
        },
      ])}
    />
  );
}
