import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';
import AppSidebar from '@/components/AppSidebar';
import AppHeader from '@/components/AppHeader.tsx';
import AppFallback from '@/components/AppFallback.tsx';
import { Suspense } from 'react';

export default function AdminLayout() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<AppHeader />

				<Suspense fallback={<AppFallback />}>
					<div className="flex flex-col flex-1 p-4">
						<Outlet />
					</div>
				</Suspense>
			</SidebarInset>
		</SidebarProvider>
	);
}
