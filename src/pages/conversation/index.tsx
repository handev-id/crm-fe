import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import ConversationList from "./conversation-list";
import { Conversation as ConversationType } from "@/api/models/conversation";

export default function Conversation() {
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);

  return (
    <div className="flex h-screen">
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-[380px] bg-white border-r border-neutral-200 flex flex-col">
        {/* Header */}
        <header className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Inbox</h1>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </header>

        {/* Tabs */}
        <div className="px-4 py-3 border-b border-neutral-200">
          <Tabs defaultValue="all">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
              <TabsTrigger value="assigned">Assigned</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-hidden">
          <ConversationList
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
          />
        </div>
      </aside>

      {/* ================= MAIN CHAT AREA ================= */}
      <main className="flex-1 flex items-center justify-center text-neutral-400">
        {selectedConversation ? (
          <span>Chat Area</span>
        ) : (
          <span>Select a conversation</span>
        )}
      </main>

      {/* ================= DETAILS PANEL (OPTIONAL) ================= */}
      {/* 
      <aside className="w-[320px] bg-white border-l border-neutral-200">
        Details Panel
      </aside>
      */}
    </div>
  );
}
