const express = require('express');

const { ethers } = require('ethers');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Define the contract ABI as a human-readable string
const contractABI = [
  'function deposit(uint256 amount) public',
  'function withdraw(uint256 amount) public'
  // Add other function declarations as needed
]

const contractAddress = '0x8Eb413920478042C026610362b5D286B220Ee896'; // Replace with your contract's address

async function interactWithContract() {
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
    console.log('Result:', result);

    // You can handle the result here as needed

  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to interact with the contract
interactWithContract();

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});

