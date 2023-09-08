// Scripts for deploying StableCoinWallet.sol onto the blockchain
// To specify network, use --network flag when running the script
// IMPORTANT: After each re-deployment, note down the contract address
const hre = require("hardhat");
async function main() {
  const [deployer] = await hre.ethers.getSigners();
  // for hardhat network, deployer is always Account #0 (0xf39...)
  // for Sepolia testnet, deployer is defined by RPC URL and private key in "networks" section of hardhat.config.js
  // for metamask, deployer is the connected wallet address

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy StableCoinWallet.sol
  const contract = await hre.ethers.deployContract("FiatWallet");
  const contractAddress = await contract.getAddress();
  console.log("FiatWallet contract address:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
