import { Calendar, ChevronUp, Home, Inbox, PiggyBank, Search, Settings, User2 } from 'lucide-react';
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
import useAuthenticated from '@/features/auth/hooks/useAuthenticated.ts';
import useLogout from '@/features/auth/hooks/useLogout';

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
	const { user } = useAuthenticated();
	const { mutate: logout, isPending } = useLogout();

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuButton>
						<PiggyBank />
						Expense Tracker
					</SidebarMenuButton>
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
								<SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground truncate">
									<User2 />
									<span className="text-xs text-muted-foreground truncate max-w-[180px]">{user.email}</span>
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								align="start"
								sideOffset={6}
								className="z-50 w-[--radix-dropdown-menu-trigger-width] min-w-44"
							>
								<DropdownMenuItem>Thông tin người dùng</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<SidebarMenuButton onClick={() => logout()} disabled={isPending}>
										{isPending ? 'Đang đăng xuất…' : 'Đăng xuất'}
									</SidebarMenuButton>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
