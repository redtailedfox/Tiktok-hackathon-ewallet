import React, {useEffect, useState, useRef} from 'react';
import { ethers } from 'ethers';

const DashboardPage = () => {
  const [balance, setBalance] = useState(0);
  const DepositRef  = useRef(0);
  const WithdrawRef = useRef(0);

  // Define the contract ABI as a human-readable string
  const contractABI = [
  	'function CreateNewWallet(uint uid) external returns (address)',
  	'function DestroyWallet(uint uid) external',
  	'function TransferMoneyBetweenWallets(uint src_uid, uint dst_uid, uint value) external',
  	'function getBalanceOf(uint uid) external view returns (uint)',
  	'function DepositTo(uint uid, uint value) external',
  	'function Withdraw(uint uid, uint value)'
  ]
  
  const uid = 0; // replace this after we have implemented a proper user db
  const privateKey = '0x5fd6b27f57eab64199746e98432671ad06a85ff9b9764dff551b364ee2260c42';
  const contractAddress = '0x7235D43a75784cD8925C99aC051E16e8FD2A351A'; // Replace with your contract's address
  const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/VBkUtfva_xhZXNXI9dvABP8Be-AXpilo');
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const signer = new ethers.Wallet(privateKey, provider);
  const connectedcontract = contract.connect(signer)
  
  async function deposit() {
	connectedcontract.DepositTo(uid, Number(DepositRef.current.value));
  }
  
  async function showbalance() {
    const txn = Number(await connectedcontract.getBalanceOf(uid));
	setBalance(txn);
  }
 
  async function withdraw() {
	connectedcontract.Withdraw(uid, 100);
  }
   useEffect(() => {showbalance()}, []);
   return (
     <div style={styles.body}>
       <div style={styles.header}>
         <h1>Dashboard</h1>
       </div>
       <div style={styles.dashboardContainer}>
         <div style={styles.section}>
           <h2>Wallet Details: {balance}</h2>
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
		  <div style={styles.inputContainer}>
			<input
			  onKeyPress={(event) => {
			  	if (!/[0-9]/.test(event.key)) {
			  		event.preventDefault();
			  	}
			  }}
			  type="number"
			  ref={DepositRef}
			  placeholder="Input amount to deposit..."
			/>
            <button onClick={deposit}>Deposit</button>
		  </div>
         </div>
         <div style={styles.section}>
           <h2>Withdraw Funds</h2>
		  <div style={styles.inputContainer}>
			<input
			  onKeyPress={(event) => {
			  	if (!/[0-9]/.test(event.key)) {
			  		event.preventDefault();
			  	}
			  }}
			  type="number"
			  ref={WithdrawRef}
			  placeholder="Input amount to withdraw..."
			/>
            <button onClick={withdraw}>Withdraw</button>
		  </div>
           {/* Form for withdrawing funds */}
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
