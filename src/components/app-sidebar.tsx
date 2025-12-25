import {
  Bell,
  Contact,
  LucideProps,
  Megaphone,
  MessageCircleMore,
  MonitorCloud,
  MonitorSmartphone,
  UserPlus,
  UserRound,
} from "lucide-react";

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
} from "@/components/ui/sidebar";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Link, useLocation } from "react-router-dom";
import { User } from "@/api/models/user";

const data = {
  menu: {
    dashboard: [
      {
        name: "Dashboard",
        url: "/",
        icon: MonitorCloud,
      },
    ],
    omnichannel: [
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
    setting: [
      {
        name: "Whatsapp Gateway",
        url: "/setting/whatsapp",
        icon: MonitorSmartphone,
      },
      {
        name: "User",
        url: "/setting/user",
        icon: UserPlus,
      },
    ],
  },
};

interface Props {
  user: User;
  onLogout: () => void;
}

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & Props) {
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
              <div className="bg-primary w-10 h-10 rounded-full" />
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
          <SidebarMenuItem className="mx-2 space-y-4">
            <Menu title="Dashboard" menus={data.menu.dashboard} />
            <Menu title="Omnichannel" menus={data.menu.omnichannel} />
            <Menu title="Setting" menus={data.menu.setting} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={props.user}
          menus={[
            {
              title: "Account",
              icon: UserRound,
              path: "/account",
            },
            {
              title: "Notifications",
              icon: Bell,
              path: "/notifications",
            },
          ]}
          onLogout={props.onLogout}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function Menu({
  title,
  menus,
}: {
  title: string;
  menus: {
    name: string;
    url: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
  }[];
}) {
  const pathName = useLocation().pathname;
  return (
    <div>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {menus.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              tooltip={item.name}
              className="py-5 px-3"
              isActive={pathName === item.url}
            >
              <Link to={item.url}>
                <item.icon />
                <span className="group-data-[collapsible=icon]:hidden">
                  {item.name}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );
}

// function CollapsibleMenu({
//   item,
//   defaultOpen = true,
// }: {
//   item: {
//     title: string;
//     items: {
//       title: string;
//       url: string;
//       isActive?: boolean;
//     }[];
//   };
//   defaultOpen?: boolean;
// }) {
//   return (
//     <Collapsible
//       key={item.title}
//       title={item.title}
//       defaultOpen={defaultOpen}
//       className="group/collapsible"
//     >
//       <SidebarGroup>
//         <SidebarGroupLabel
//           asChild
//           className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
//         >
//           <CollapsibleTrigger>
//             {item.title}
//             <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90 text-inherit" />
//           </CollapsibleTrigger>
//         </SidebarGroupLabel>

//         <CollapsibleContent>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {item.items.map((sub) => (
//                 <SidebarMenuItem key={sub.title}>
//                   <SidebarMenuButton asChild isActive={sub.isActive}>
//                     <a href={sub.url}>{sub.title}</a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </CollapsibleContent>
//       </SidebarGroup>
//     </Collapsible>
//   );
// }
