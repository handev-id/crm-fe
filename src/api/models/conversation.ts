import { Channel } from "./channel";
import { Contact } from "./contact";
import { Message } from "./message";

export type Conversation = {
  id: number;
  channelId: number;
  channel: Channel;
  contact: Contact;
  profileId: number;
  agentId: number | null;
  lastAgentId: number | null;
  lastMessage: Message | null;
  lastSeen: string | null;
  lastActivity: string;
  status: "unassigned" | "assigned" | "resolved";
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
};
