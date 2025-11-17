import { LoginInputType } from "@/pages/auth/login";
import { User } from "../models/user";
import service from "../service";

export function registerApi(data: Partial<User>) {
  return service.post("/auth/register", data).then((response) => response.data);
}

export function loginApi(data: LoginInputType): Promise<{ token?: string }> {
  return service.post("/auth/login", data).then((response) => response.data);
}

export function checkTokenApi({ token }: { token: string }): Promise<User> {
  return service
    .get("/auth/check-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
}
