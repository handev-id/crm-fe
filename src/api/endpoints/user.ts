import { User } from "../models/user";
import { PaginatedResponse } from "../paginated-response";
import service from "../service";

export function userIndexApi(): Promise<PaginatedResponse<User>> {
  return service.get("/user").then((response) => response.data);
}
