import { useApi } from "@/api/api";
import { checkTokenApi, logoutApi } from "@/api/endpoints/auth";
import service from "@/api/service";
import { AppSidebar } from "@/components/app-sidebar";
import LoadingPage from "@/components/loading-page";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import useHandleMessage from "@/hooks/use-handle-message";
import useSocket from "@/hooks/use-socket";
import useUser from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

export default function Layout() {
  const [cookies] = useCookies(["token"]);
  const [mount, setMount] = useState<boolean>(false);
  const setSocket = useSocket((state) => state.setSocket);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const token = cookies.token;

  // handle message
  useHandleMessage();

  const checkToken = useApi({
    api: checkTokenApi,
    onSuccess: (data) => {
      if (data) {
        const bearerAuth = `Bearer ${token}`;
        service.defaults.headers.Authorization = bearerAuth;

        const socketIo = io(
          `${import.meta.env.VITE_API_URL}`.replace("/api", ""),
          {
            transports: ["websocket"],
            auth: {
              token: token,
            },
          }
        );

        setSocket(socketIo);
        setUser(data);
        setMount(true);
      } else {
        alert("Something went wrong");
      }
    },
    onFail: () => {
      navigate("/login", { replace: true });
    },
  });

  const logout = useApi({
    api: logoutApi,
    onSuccess: () => {
      navigate("/login");
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
    <SidebarProvider defaultOpen={false}>
      <AppSidebar
        onLogout={() => {
          toast.promise(logout.process({}), {
            loading: "Loading...",
            success: "Success",
          });
        }}
        user={user!}
      />
      <SidebarInset>
        <div className="p-2">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
