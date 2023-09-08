import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";

// Import the components
import CreateAccountPage from './CreateAccountPage'; // Replace with the actual path
import LoginPage from './LoginPage'; // Replace with the actual path
import DashboardPage from './DashboardPage'; // Replace with the actual path

function App() {

  return (
    <div className="App">
      <CreateAccountPage />
      <LoginPage />
      <DashboardPage />
    </div>
  );
}

export default App;
