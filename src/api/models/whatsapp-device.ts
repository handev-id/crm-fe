export type WhatsappDevice = {
  id: number;
  name: string;
  countryCode: string;
  phone: string;
  status: "CONNECTED" | "DISCONNECTED";
  whatsappId: string;
  createdAt: string;
  updatedAt: string;
};
