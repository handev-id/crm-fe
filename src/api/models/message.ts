export type Message = {
  id: number;
  text: string;
  status: "unread" | "read" | "sent";
  senderId: number;
  createdAt: string;
};
