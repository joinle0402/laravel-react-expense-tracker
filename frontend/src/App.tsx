import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from "@/features/auth/pages/Login.tsx";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="*" element={<Navigate to="/login" />} />
		</Routes>
	);
}
