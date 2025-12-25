import { User } from "../models/user";
import { PaginatedResponse } from "../paginated-response";
import service from "../service";

export function userIndexApi({
  page = 1,
  limit = 2,
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
        limit,
        search,
      },
    })
    .then((response) => response.data);
}
