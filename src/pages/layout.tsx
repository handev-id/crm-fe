import { useApi } from "@/api/api";
import { checkTokenApi, logoutApi } from "@/api/endpoints/auth";
import service from "@/api/service";
import { AppSidebar } from "@/components/app-sidebar";
import LoadingPage from "@/components/loading-page";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
        <header className="flex sticky top-0 z-40  h-16 shrink-0 items-center shadow bg-white gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
