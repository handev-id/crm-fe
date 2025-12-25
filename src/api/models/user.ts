import { Attachment } from "./attachment";

export type User = {
  id: number;
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  phone?: string;
  avatar?: File | Attachment;
  password: string;
  roles?: number[];
  token?: string;
  lastLogin?: string;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
};
