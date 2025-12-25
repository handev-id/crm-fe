import { appendFormData } from "@/lib/formdata";
import { User } from "../models/user";
import { PaginatedResponse } from "../paginated-response";
import service from "../service";

export function userIndexApi({
  page = 1,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedResponse<User>> {
  return service
    .get("/user", {
      params: {
        page,
        search,
      },
    })
    .then((response) => response.data);
}

export function userCreateApi(data: Partial<User>): Promise<User> {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    appendFormData(formData, key, value);
  });

  return service.post("/user", formData).then((response) => response.data);
}

export function userUpdateApi(data: Partial<User>): Promise<User> {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    appendFormData(formData, key, value);
  });

  return service
    .put(`/user/${data.id}`, formData)
    .then((response) => response.data);
}

export function userDeleteApi(id: number): Promise<void> {
  return service.delete(`/user/${id}`).then((response) => response.data);
}
