// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// CONTRACT!
// TODO: add events on change of balance so that we can update our frontend whenever necessary

// BACKEND!
// TODO: catch errors, rate limit too many clicks
// TODO: provide confirmation window
// TODO: listen to BalanceUpdated event and re-render the page
// TODO: implement db and actual user system
// TODO: log transactions? transaction history thonk


contract TikToken {

	event BalanceChanged(uint uid);

	mapping(uint => address) private _userWallets;
	address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

	modifier walletExists(uint uid) {
		require(_userWallets[uid] != address(0), "Wallet does not exist!");
		_;
	}

    constructor() {
        owner = msg.sender;
    }

	function CreateNewWallet(uint uid) external onlyOwner walletExists(uid) returns (address) {
		_userWallets[uid] = address(new FiatWallet()); // create a new wallet
		return _userWallets[uid];
	}

	function DestroyWallet(uint uid) external onlyOwner walletExists(uid) {
		delete _userWallets[uid];
	}

	function TransferMoneyBetweenWallets(uint src_uid, uint dst_uid, uint value) external onlyOwner {
		require(src_uid != 0, "Source Wallet does not exist!");
		require(dst_uid != 0, "Destination Wallet does not exist!");
		require(src_uid != dst_uid, "Cannot transfer to the same wallet!");

		FiatWallet(_userWallets[src_uid]).withdraw(value);
		FiatWallet(_userWallets[dst_uid]).deposit(value);

		emit BalanceChanged(src_uid);
		emit BalanceChanged(dst_uid);
	}

	function getBalanceOf(uint uid) external view onlyOwner walletExists(uid) returns (uint){
		return FiatWallet(_userWallets[uid]).balance();
	}

	function DepositTo(uint uid, uint value) external onlyOwner walletExists(uid) {
		FiatWallet(_userWallets[uid]).deposit(value);
		emit BalanceChanged(uid);
	}

	function Withdraw(uint uid, uint value) external onlyOwner {
		require(_userWallets[uid] != address(0), "Wallet does not exist!");
		FiatWallet(_userWallets[uid]).withdraw(value);
		emit BalanceChanged(uid);
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
