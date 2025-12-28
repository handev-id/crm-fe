import { Conversation } from "@/api/models/conversation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreHorizontal } from "lucide-react";
import moment from "moment";

const mockConversations: Conversation[] = [
  {
    id: 1,
    channelId: 1,
    channel: {
      id: 1,
      name: "facebook",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    contact: {
      id: 1,
      firstName: "Dorothy",
      lastName: "Ng",
      avatar: { url: "https://i.pravatar.cc/150?img=1" },
    },
    profileId: 1,
    agentId: 1,
    lastAgentId: 1,
    lastMessage: {
      id: 1,
      text: "Yes, please provide with the requested information as soon as you can.",
      status: "read",
      senderId: 1,
      createdAt: "2024-01-15T09:15:00Z",
    },
    lastSeen: "2024-01-15T09:15:00Z",
    lastActivity: "2024-01-15T09:15:00Z",
    status: "assigned",
    unreadCount: 0,
    createdAt: "2024-01-15T08:15:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
  },
  {
    id: 2,
    channelId: 2,
    channel: {
      id: 2,
      name: "whatsapp",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    contact: {
      id: 2,
      firstName: "Nigel",
      lastName: "Ng",
      avatar: { id: 2, url: "https://i.pravatar.cc/150?img=2" },
    },
    profileId: 1,
    agentId: 1,
    lastAgentId: 1,
    lastMessage: {
      id: 2,
      text: "Are there any requirements or...",
      status: "read",
      senderId: 2,
      createdAt: "2024-01-15T09:10:00Z",
    },
    lastSeen: "2024-01-15T09:10:00Z",
    lastActivity: "2024-01-15T09:10:00Z",
    status: "assigned",
    unreadCount: 1,
    createdAt: "2024-01-15T09:10:00Z",
    updatedAt: "2024-01-15T09:10:00Z",
  },
  {
    id: 3,
    channelId: 3,
    channel: {
      id: 3,
      name: "instagram",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
    },
    contact: {
      id: 3,
      firstName: "David",
      lastName: "Ng",
      avatar: { id: 3, url: "https://i.pravatar.cc/150?img=3" },
    },
    profileId: 1,
    agentId: null,
    lastAgentId: null,
    lastMessage: {
      id: 3,
      text: "I'm specifically inquiring about...",
      status: "unread",
      senderId: 3,
      createdAt: "2024-01-15T09:10:00Z",
    },
    lastSeen: null,
    lastActivity: "2024-01-15T09:10:00Z",
    status: "unassigned",
    unreadCount: 2,
    createdAt: "2024-01-15T09:10:00Z",
    updatedAt: "2024-01-15T09:10:00Z",
  },
];

const getChannelIcon = (channelName: string) => {
  return channelName === "facebook"
    ? "📘"
    : channelName === "whatsapp"
    ? "💬"
    : "📷";
};

interface Props {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation) => void;
}

export default function ConversationList({
  selectedConversation,
  setSelectedConversation,
}: Props) {
  return (
    <ScrollArea className="flex-1">
      {mockConversations.map((conv) => (
        <div
          key={conv.id}
          className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
            selectedConversation?.id === conv.id ? "bg-blue-50" : ""
          }`}
          onClick={() => setSelectedConversation(conv)}
        >
          <div className="flex gap-3">
            <div className="relative">
              <Avatar>
                <AvatarImage src={conv.contact.avatar?.url} />
                <AvatarFallback>
                  {conv.contact.firstName[0]}
                  {conv.contact.lastName[0]}
                </AvatarFallback>
              </Avatar>
              {conv.status === "assigned" && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {conv.contact.firstName} {conv.contact.lastName}
                  </span>
                  <span className="text-xs">
                    {moment(conv.lastActivity).format("hh:mm A")}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs">
                  {getChannelIcon(conv.channel.name)} {conv.channel.name}
                </span>
                {conv.unreadCount > 0 && (
                  <Badge variant="destructive" className="h-5 px-2 text-xs">
                    {conv.unreadCount}
                  </Badge>
                )}
              </div>

              <p className="text-sm text-gray-600 truncate">
                {conv.lastMessage?.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}
