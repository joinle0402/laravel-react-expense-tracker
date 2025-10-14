import { ChevronUp, PiggyBank, User2 } from 'lucide-react';
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
import { SIDEBAR_NAV } from '@/constants/navigate.ts';
import { NavLink, useLocation } from 'react-router-dom';

export default function AppSidebar() {
	const { user } = useAuthenticated();
	const { mutate: logout, isPending } = useLogout();
	const location = useLocation();

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuButton className="py-5">
						<div className="flex items-center gap-2">
							<PiggyBank />
							<div className="leading-tight">
								<div className="text-sm font-semibold">Expense Tracker</div>
								<div className="text-xs text-muted-foreground">Quản lý chi tiêu</div>
							</div>
						</div>
					</SidebarMenuButton>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Điều hướng</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{SIDEBAR_NAV.map((item) => (
								<SidebarMenuItem key={item.to}>
									<SidebarMenuButton
										asChild
										isActive={
											location.pathname === item.to || (item.to !== '/admin/dashboard' && location.pathname.startsWith(item.to))
										}
									>
										<NavLink to={item.to} end={item.to === '/admin/dashboard'}>
											<item.icon className="mr-2 h-4 w-4" />
											<span>{item.label}</span>
										</NavLink>
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
