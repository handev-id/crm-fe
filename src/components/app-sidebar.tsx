import { Contact, Megaphone, MessageCircleMore } from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useEffect } from "react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  menus: [
    {
      name: "Conversation",
      url: "/conversation",
      icon: MessageCircleMore,
    },
    {
      name: "Contact",
      url: "/contact",
      icon: Contact,
    },
    {
      name: "Campaign",
      url: "/campaign",
      icon: Megaphone,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const sidebar = useSidebar();

  useEffect(() => {
    if (sidebar.open) {
      sidebar.toggleSidebar();
    }
  }, []);
  return (
    <Sidebar
      style={
        {
          "--sidebar": "#fff",
        } as React.CSSProperties
      }
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="justify-start">
              <div className="size-7 rounded-md bg-primary" />
              <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-base font-bold">CentraChannel</span>
                <span className="text-xs text-muted-foreground">Plan</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="mx-2">
            <SidebarGroupLabel>Omnichannel</SidebarGroupLabel>
            <SidebarMenu>
              {data.menus.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.name}
                    className="py-5 px-3"
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.name}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
