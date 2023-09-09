// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TikToken {

	mapping(uint => address) private _userWallets;
	address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

	function CreateNewWallet(uint uid) external onlyOwner returns (address) {
		_userWallets[uid] = address(new FiatWallet()); // create a new wallet
		return _userWallets[uid];
	}

	function DestroyWallet(uint uid) external onlyOwner {
		delete _userWallets[uid];
	}

	function TransferMoneyBetweenWallets(uint src_uid, uint dst_uid, uint value) external onlyOwner {
		FiatWallet(_userWallets[src_uid]).withdraw(value);
		FiatWallet(_userWallets[dst_uid]).deposit(value);
	}

	function getBalanceOf(uint uid) external view onlyOwner returns (uint){
		return FiatWallet(_userWallets[uid]).balance();
	}

	function DepositTo(uint uid, uint value) external onlyOwner {
		FiatWallet(_userWallets[uid]).deposit(value);
	}

	function Withdraw(uint uid, uint value) external onlyOwner {
		FiatWallet(_userWallets[uid]).withdraw(value);
	}

}

contract FiatWallet {
    uint public balance;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender; // each wallet will be owned by overarching contract
    }

    function deposit(uint amount) external onlyOwner {
        require(amount != 0, "Amount must be greater than zero");
        balance += amount;
    }

    function withdraw(uint amount) external onlyOwner {
        require(balance >= amount, "Insufficient balance");
        balance -= amount;
    }

}
