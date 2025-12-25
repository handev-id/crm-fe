"use client";

import { MoreVertical, LogOut, LucideProps } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/api/models/user";
import { Attachment } from "@/api/models/attachment";
import { getFullName } from "@/hooks/use-user";

interface Props {
  user: User;
  onLogout: () => void;
  menus: {
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    title: string;
    path: string;
  }[];
}

export function NavUser({ user, menus = [], onLogout }: Props) {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  console.log("avatar url:", (user.avatar as Attachment)?.url);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="
                data-[state=open]:bg-sidebar-accent 
                data-[state=open]:text-sidebar-accent-foreground
              "
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={(user.avatar as Attachment)?.url}
                  alt={user.firstName}
                />
                <AvatarFallback className="rounded-lg">
                  {getFullName(user.firstName, user.lastName).charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {getFullName(user.firstName, user.lastName)}
                </span>

                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>

              <MoreVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="
              w-(--radix-dropdown-menu-trigger-width) 
              min-w-56 
              rounded-lg
              bg-popover
              text-popover-foreground
            "
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={(user.avatar as Attachment)?.url}
                    alt={user.firstName}
                  />
                  <AvatarFallback className="rounded-lg">
                    {getFullName(user.firstName, user.lastName).charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {getFullName(user.firstName, user.lastName)}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {menus.map((menu) => (
                <DropdownMenuItem onClick={() => navigate(menu.path)}>
                  <menu.icon className="size-4 text-inherit" />
                  {menu.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive" onClick={onLogout}>
              <LogOut className="size-4 text-inherit" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
