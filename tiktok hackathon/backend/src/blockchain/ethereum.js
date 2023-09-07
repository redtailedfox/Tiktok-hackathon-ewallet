const Web3 = require('web3');
const contractABI = require('./contractABI.json'); // Replace with your contract's ABI
const contractAddress = '0xYourContractAddress'; // Replace with your contract's address
const privateKey = 'YourPrivateKey'; // Replace with your wallet's private key
const infuraUrl = 'https://mainnet.infura.io/v3/YourInfuraProjectId'; // Replace with your Infura project URL

const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));

const wallet = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(wallet);

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function sendTransaction() {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 200000; // Adjust based on your contract's requirements
    const valueToSend = web3.utils.toWei('1', 'ether'); // Amount to send in Wei

    const nonce = await web3.eth.getTransactionCount(wallet.address, 'latest');

    const tx = {
      from: wallet.address,
      to: contractAddress,
      gasPrice: gasPrice,
      gas: gasLimit,
      nonce: nonce,
      value: valueToSend,
      data: contract.methods.someMethod().encodeABI(), // Replace with your contract method
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log('Transaction Hash:', txReceipt.transactionHash);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the function to send a transaction general function
sendTransaction();


// Call a function on the smart contract written
const result = await contract.methods.someFunction().call();
console.log('Result:', result);

// Send a transaction to the smart contract
const accounts = await web3.eth.getAccounts();
const tx = await contract.methods.someFunction().send({
  from: accounts[0],
  value: web3.utils.toWei('1', 'ether'), // Value in Wei
});
console.log('Transaction hash:', tx.transactionHash);