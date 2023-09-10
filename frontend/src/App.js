import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Import the components
import CreateAccountPage from './CreateAccountPage'; // Replace with the actual path
import LoginPage from './LoginPage'; // Replace with the actual path
import DashboardPage from './DashboardPage'; // Replace with the actual path

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to='/login' replace />}/>
				<Route path="/dashboard" element={<DashboardPage/>}/>
				<Route path="/login" element={<LoginPage/>}/>
				<Route path="/register" element={<CreateAccountPage/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
