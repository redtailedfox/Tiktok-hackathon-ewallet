// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FiatWallet {
    mapping(address => uint256) private balances;
    address public owner;

    event Deposit(address indexed user, uint256 amount);
    event Withdrawal(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function deposit(uint256 amount) public {
        require(amount > 0, "Amount must be greater than zero");
        balances[msg.sender] += amount;

        emit Deposit(msg.sender, amount);
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        // Removing the ether transfer part as we are not dealing with real ether

        emit Withdrawal(msg.sender, amount);
    }

    function getBalance(address userAddress) public view returns (uint256) {
        return balances[userAddress];
    }

    function withdrawAll() public onlyOwner {
        uint256 amount = address(this).balance;
        payable(owner).transfer(amount);
    }
}
