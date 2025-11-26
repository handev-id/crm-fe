import { useState } from "react";
import { Search, SlidersHorizontal, MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatMessage {
  id: string;
  name: string;
  avatar: string;
  message: string;
  time: string;
  status: "new" | "in_progress" | "waiting" | "completed";
  unread?: boolean;
  channel: "whatsapp" | "instagram" | "facebook" | "email" | "webchat";
}

export default function Conversation() {
  const [activeTab, setActiveTab] = useState("new");
  const [searchQuery, setSearchQuery] = useState("");

  const chatData: ChatMessage[] = [
    {
      id: "1",
      name: "Eric Tansil",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eric",
      message: "Okay. Sound great, thank you! We will...",
      time: "3 mins",
      status: "new",
      unread: true,
      channel: "whatsapp",
    },
    {
      id: "2",
      name: "Iqbal Nur Hakim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Iqbal",
      message: "Your report is almost finished! you'll Wi...",
      time: "32 mins",
      status: "new",
      channel: "instagram",
    },
    {
      id: "3",
      name: "Sarah Tjahaja",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      message: "That's the spirit, Sarah. I believe you'd s...",
      time: "21 mins",
      status: "in_progress",
      channel: "facebook",
    },
    {
      id: "4",
      name: "George Sumarno",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=George",
      message: "Okay. Sound great!",
      time: "43 mins",
      status: "in_progress",
      channel: "whatsapp",
    },
    {
      id: "5",
      name: "David Salimba",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      message: "Okay. Sound great, thank you! We will...",
      time: "44 mins",
      status: "waiting",
      channel: "email",
    },
    {
      id: "6",
      name: "Siva Aprilia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siva",
      message: "Okay. Sound great, thank you! We will...",
      time: "51 mins",
      status: "waiting",
      channel: "webchat",
    },
    {
      id: "7",
      name: "Elizabeth Chandra",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elizabeth",
      message: "Okay. Sound great, thank you! We will...",
      time: "59 mins",
      status: "completed",
      channel: "whatsapp",
    },
    {
      id: "8",
      name: "Dian Sastro Wardoyo",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dian",
      message: "Okay. Sound great, thank you! We will...",
      time: "Yesterday",
      status: "completed",
      channel: "instagram",
    },
    {
      id: "9",
      name: "Wulan Guntiro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wulan",
      message: "Okay. Sound great, thank you! We will...",
      time: "Yesterday",
      status: "completed",
      channel: "facebook",
    },
  ];

  const channelIcons = {
    whatsapp: "💬",
    instagram: "📷",
    facebook: "👍",
    email: "📧",
    webchat: "💻",
  };

  const filteredChats = chatData.filter((chat) => {
    const matchesSearch =
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "new"
        ? chat.status === "new"
        : activeTab === "in_progress"
        ? chat.status === "in_progress"
        : activeTab === "waiting"
        ? chat.status === "waiting"
        : activeTab === "completed"
        ? chat.status === "completed"
        : true;
    return matchesSearch && matchesTab;
  });

  const getStatusCount = (status: string) => {
    return chatData.filter((chat) => chat.status === status).length;
  };

  return (
    <Card className="fixed">
      <CardContent>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="new" className="relative">
              New
              {getStatusCount("new") > 0 && (
                <Badge
                  variant="destructive"
                  className="ml-1 px-1.5 py-0 text-xs h-5"
                >
                  {getStatusCount("new")}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="in_progress">In Progress</TabsTrigger>
            <TabsTrigger value="waiting">Waiting</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>

        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-1">
            {filteredChats.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No conversations found
              </div>
            ) : (
              filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors ${
                    chat.unread ? "bg-accent/50" : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>
                        {chat.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center text-xs border-2 border-background">
                      {channelIcons[chat.channel]}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4
                        className={`text-sm truncate ${
                          chat.unread ? "font-semibold" : "font-medium"
                        }`}
                      >
                        {chat.name}
                      </h4>
                      <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                        {chat.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.message}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Mark as read</DropdownMenuItem>
                      <DropdownMenuItem>Assign to agent</DropdownMenuItem>
                      <DropdownMenuItem>Move to waiting</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete conversation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
