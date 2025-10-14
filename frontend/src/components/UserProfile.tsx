import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx';
import { Avatar, AvatarFallback } from '@/components/ui/avatar.tsx';
import { Button } from '@/components/ui/button.tsx';
import { createAvatar, getAvatarColor, readableTextOn } from '@/features/auth/auth.util.ts';
import useAuthenticated from '@/features/auth/hooks/useAuthenticated.ts';
import useLogout from '@/features/auth/hooks/useLogout.ts';
import { SidebarMenuButton } from '@/components/ui/sidebar.tsx';

export default function UserProfile() {
	const { user } = useAuthenticated();
	const { mutate: logout, isPending } = useLogout();

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" className="rounded-full cursor-pointer">
					<Avatar className="h-9 w-9 rounded-full ">
						<AvatarFallback
							className="rounded-full"
							style={{ backgroundColor: getAvatarColor(user.name), color: readableTextOn(getAvatarColor(user.name)) }}
						>
							{createAvatar(user.name)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side="bottom" align="end" sideOffset={4}>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="h-8 w-8 rounded-full">
							<AvatarFallback
								className="rounded-full"
								aria-label={user.name ?? 'User'}
								title={user.name ?? ''}
								style={{ backgroundColor: getAvatarColor(user.name), color: readableTextOn(getAvatarColor(user.name)) }}
							>
								{createAvatar(user.name)}
							</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">{user.name}</span>
							<span className="text-muted-foreground truncate text-xs">{user.email}</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>Thông tin người dùng</DropdownMenuItem>
					<DropdownMenuItem>Cài đặt</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<SidebarMenuButton onClick={() => logout()} disabled={isPending}>
						{isPending ? 'Đang đăng xuất…' : 'Đăng xuất'}
					</SidebarMenuButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
