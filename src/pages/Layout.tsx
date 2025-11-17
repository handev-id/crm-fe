import { useApi } from "@/api/api";
import { checkTokenApi } from "@/api/endpoints/auth";
import service from "@/api/service";
import LoadingPage from "@/components/LoadingPage";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const [cookies] = useCookies(["token"]);
  const [mount, setMount] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = cookies.token;

  const checkToken = useApi({
    api: checkTokenApi,
    onSuccess: () => {
      service.defaults.headers.Authorization = `Bearer ${token}`;
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
    <div>
      <Outlet />
    </div>
  );
}
