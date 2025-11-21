import { useApi } from "@/api/api";
import { checkTokenApi } from "@/api/endpoints/auth";
import service from "@/api/service";
import LoadingPage from "@/components/LoadingPage";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import useSocket from "@/lib/useSocket";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout() {
  const [cookies] = useCookies(["token"]);
  const [mount, setMount] = useState<boolean>(false);
  const setSocket = useSocket((state) => state.setSocket);
  const navigate = useNavigate();
  const token = cookies.token;

  const checkToken = useApi({
    api: checkTokenApi,
    onSuccess: () => {
      const bearerAuth = `Bearer ${token}`;
      service.defaults.headers.Authorization = bearerAuth;

      const socketIo = io(
        `${import.meta.env.VITE_API_URL}`.replace("/api", ""),
        {
          transports: ["websocket"],
          auth: {
            token: bearerAuth,
          },
        }
      );

      setSocket(socketIo);

      setMount(true);
    },
    onFail: () => {
      navigate("/login", { replace: true });
    },
  });

  useEffect(() => {
    if (token) {
      checkToken.process({ token });
    } else {
      navigate("/login", { replace: true });
    }
  }, [token]);

  if (!mount) {
    return <LoadingPage />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
