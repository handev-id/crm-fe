import { useApi } from "@/api/api";
import { checkTokenApi } from "@/api/endpoints/auth";
import service from "@/api/service";
import { AppSidebar } from "@/components/app-sidebar";
import LoadingPage from "@/components/LoadingPage";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useSocket from "@/hooks/useSocket";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

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
        <header className="flex h-16 shrink-0 items-center shadow bg-white gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
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
