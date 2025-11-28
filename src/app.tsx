import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/layout";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard";
import Conversation from "./pages/conversation";
import SettingLayout from "./pages/setting/layout";
import SettingWhatsapp from "./pages/setting/whatsapp";
import SettingUser from "./pages/setting/user";

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
            {
              path: "setting",
              element: <SettingLayout />,
              children: [
                {
                  path: "whatsapp",
                  element: <SettingWhatsapp />,
                },
                {
                  path: "user",
                  element: <SettingUser />,
                },
              ],
            },
          ],
        },
      ])}
    />
  );
}
