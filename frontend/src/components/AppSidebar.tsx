import { Calendar, ChevronUp, Home, Inbox, Search, Settings, User2 } from 'lucide-react';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const items = [
	{
		title: 'Home',
		url: '#',
		icon: Home
	},
	{
		title: 'Inbox',
		url: '#',
		icon: Inbox
	},
	{
		title: 'Calendar',
		url: '#',
		icon: Calendar
	},
	{
		title: 'Search',
		url: '#',
		icon: Search
	},
	{
		title: 'Settings',
		url: '#',
		icon: Settings
	}
];

export default function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuButton>Expense Tracker</SidebarMenuButton>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
									<User2 /> Username
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								align="start"
								sideOffset={6}
								className="z-50 w-[--radix-dropdown-menu-trigger-width] min-w-44"
							>
								<DropdownMenuItem>Account</DropdownMenuItem>
								<DropdownMenuItem>Billing</DropdownMenuItem>
								<DropdownMenuItem>Sign out</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
