// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Force {/*

                   MEOW ?
         /\_/\   /
    ____/ o o \
  /~____  =ø= /
 (______)__m_m)

*/}

contract TestForce {
    address f;

    constructor(address _f) {
        f = _f;
    }

    function addMoney() public payable {
        // (bool success, ) = payable(f).call{value:msg.value}("");
        // console.log(success);
        payable(f).transfer(msg.value);
        console.log(address(this).balance);
        console.log(f.balance);
    }

}