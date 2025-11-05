import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link, useLocation } from 'react-router-dom';
import { SIDEBAR_NAV } from '@/constants/navigate.ts';
import { Fragment } from 'react';

const normalize = (p: string) => (p.endsWith('/') && p !== '/' ? p.slice(0, -1) : p);

const NAV_INDEX = new Map(SIDEBAR_NAV.map((i) => [normalize(i.to), i.label]));

function labelFromPath(path: string): string | undefined {
	return NAV_INDEX.get(normalize(path));
}

const titleize = (s: string) => s.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export default function AppBreadcrumbs() {
	const { pathname } = useLocation();

	const segments = pathname.split('/').filter(Boolean);
	const breadcrumbs = segments
		.map((_, index, array) => {
			const to = '/' + array.slice(0, index + 1).join('/');
			const effectiveTo = to === '/admin' || to === '/admin/' ? '/admin/dashboard' : to;
			const fromNav = labelFromPath(effectiveTo);
			const fallback = titleize(array[index]);
			return { to, label: fromNav ?? fallback };
		})
		.filter((c) => c.to !== '/admin');

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((item, index) => {
					return (
						<Fragment key={item.to}>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link to={item.to}>{item.label}</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							{index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
						</Fragment>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
