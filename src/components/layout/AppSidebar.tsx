import * as React from 'react';
import { Link } from 'react-router-dom';

import {
  Bot,
  Map,
  Frame,
  BookOpen,
  PieChart,
  Settings2,
  SquareTerminal,
  Home,
} from 'lucide-react';

import {
  Sidebar,
  SidebarRail,
  SidebarFooter,
  SidebarContent,
} from '@/components/ui/sidebar';
import { SidebarMenuButton } from '@/components/ui/sidebar';

import { dashboardGroups } from '@/data/dashboard-groups';
import { NavMain, NavProjects, NavUser } from '@/components/layout';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible='icon'
      {...props}
    >
      <Link to='/'>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
            <Home className='size-4 shrink-0' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>Merci Bizhub</span>
            <span className='truncate text-xs'>Print City</span>
          </div>
        </SidebarMenuButton>
      </Link>

      <SidebarContent>
        <NavMain groups={dashboardGroups} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}