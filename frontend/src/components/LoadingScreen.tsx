import { Loader2 } from 'lucide-react';

export default function LoadingScreen() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<Loader2 className="h-10 w-10 animate-spin text-primary" />
			<p className="mt-4 text-sm text-muted-foreground">Đang tải...</p>
		</div>
	);
}
