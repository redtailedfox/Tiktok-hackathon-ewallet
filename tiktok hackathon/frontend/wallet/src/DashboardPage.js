import React, {useEffect, useState} from 'react';
import { ethers } from 'ethers';

const DashboardPage = () => {
    const [balance, setBalance] = useState(0);
    // Define the contract ABI as a human-readable string
const contractABI = [
    'function deposit(uint256 amount) public',
    'function withdraw(uint256 amount) public',
    'function getBalance(address userAddress) public view returns (uint256)'
    // Add other function declarations as needed
  ]
  
  const contractAddress = '0x8Eb413920478042C026610362b5D286B220Ee896'; // Replace with your contract's address
  
  async function deposit() {
    try {
      // Connect to the Ethereum network using Infura
      const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/Rr3GR128NGutd1QdUlGF0-D_i5ZkTgrF');
  
      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      
      const metamaskProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await metamaskProvider.getSigner();
      // Call a function on the smart contract
      const connectedcontract = contract.connect(signer)
      const result = await connectedcontract.deposit(88);
      console.log('Deposit:', result);
      console.log('Your balance is: ', await connectedcontract.getBalance('0x4ff7F1a730E5b9f3ED4D9D1a32Ee97B3bEB9F400'))
  
      // You can handle the result here as needed
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function showbalance() {
    // Connect to the Ethereum network using Infura
    const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/Rr3GR128NGutd1QdUlGF0-D_i5ZkTgrF');
  
    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    
    const metamaskProvider = new ethers.BrowserProvider(window.ethereum);
    const signer = await metamaskProvider.getSigner();
    // Call a function on the smart contract
    const connectedcontract = contract.connect(signer)
    setBalance(await connectedcontract.getBalance('0x4ff7F1a730E5b9f3ED4D9D1a32Ee97B3bEB9F400'));
  }
  
  async function withdraw() {
    try {
      // Connect to the Ethereum network using Infura
      const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/Rr3GR128NGutd1QdUlGF0-D_i5ZkTgrF');
  
      // Create a contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, provider);
      
      const metamaskProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await metamaskProvider.getSigner();
      // Call a function on the smart contract
      const connectedcontract = contract.connect(signer)
      const result = await connectedcontract.withdraw(88);
      console.log('Withdraw:', result);
  
      // You can handle the result here as needed
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {showbalance()}, []);
  return (
    <div style={styles.body}>
      <div style={styles.header}>
        <h1>Dashboard</h1>
      </div>
      <div style={styles.dashboardContainer}>
        <div style={styles.section}>
          <h2>Wallet Details : {balance > 0 ? balance : 'Loading...'}</h2>
          {/* Display wallet details here */}
        </div>
        <div style={styles.section}>
          <h2>Transfer Funds</h2>
          {/* Form for transferring funds */}
          <div style={styles.buttonContainer}>
            <button>Transfer</button>
          </div>
        </div>
        <div style={styles.section}>
          <h2>Deposit Funds</h2>
          {/* Form for depositing funds */}
          <div style={styles.buttonContainer}>
            <button onClick={deposit}>Deposit</button>
          </div>
        </div>
        <div style={styles.section}>
          <h2>Withdraw Funds</h2>
          {/* Form for withdrawing funds */}
          <div style={styles.buttonContainer}>
            <button onClick={withdraw}>Withdraw</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    margin: 0,
    padding: 0,
  },
  header: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
  },
  dashboardContainer: {
    margin: '20px',
  },
  section: {
    backgroundColor: '#ffffff',
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  buttonContainer: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default DashboardPage;
