import { Attachment } from "./attachment";

export type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: Attachment | null;
};
