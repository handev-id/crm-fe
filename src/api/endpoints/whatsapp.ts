import { WhatsappDevice } from "../models/whatsapp-device";
import { PaginatedResponse } from "../paginated-response";
import service from "../service";

export type EventType = {
  id: string;
  status: {
    connection: "CONNECTING" | "DISCONNECTED" | "CONNECTED";
    qr?: string;
    error?: string;
  };
};

export function whatsappCheckStatusApi(whatsappId: string): Promise<EventType> {
  return service
    .get(`/whatsapp/status/${whatsappId}`)
    .then((response) => response.data);
}

export function whatsappRestartApi(whatsappId: string): Promise<void> {
  return service
    .post(`/whatsapp/restart/${whatsappId}`)
    .then((response) => response.data);
}

export function whatsappLogoutApi(whatsappId: string): Promise<void> {
  return service
    .delete(`/whatsapp/logout/${whatsappId}`)
    .then((response) => response.data);
}

export function whatsappDeviceIndexApi({
  page = 1,
  search = "",
}: {
  page?: number;
  search?: string;
}): Promise<PaginatedResponse<WhatsappDevice>> {
  return service
    .get("/whatsapp/device", {
      params: {
        page,
        search,
      },
    })
    .then((response) => response.data);
}

export function whatsappDeviceCreateApi(
  data: Partial<WhatsappDevice>
): Promise<WhatsappDevice> {
  return service
    .post("/whatsapp/device", {
      name: data.name,
      countryCode: data.countryCode,
      phone: data.phone,
    })
    .then((response) => response.data);
}

export function whatsappDeviceUpdateApi(
  data: Partial<WhatsappDevice>
): Promise<WhatsappDevice> {
  return service
    .put(`/whatsapp/device/${data.id}`, data)
    .then((response) => response.data);
}

export function whatsappDeviceDeleteApi(id: number): Promise<void> {
  return service
    .delete(`/whatsapp/device/${id}`)
    .then((response) => response.data);
}
