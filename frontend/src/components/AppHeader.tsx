import { SidebarTrigger } from '@/components/ui/sidebar.tsx';
import UserProfile from '@/components/UserProfile.tsx';

export default function AppHeader() {
	return (
		<header className="flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<div className="ml-auto flex items-center gap-2">
					<UserProfile />
				</div>
			</div>
		</header>
	);
}
