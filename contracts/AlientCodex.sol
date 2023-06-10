// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "hardhat/console.sol";

contract Ownable {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function isOwner() public view returns (bool) {
        return owner == msg.sender;
    }

    function renounceOwnership() public {
        require(isOwner());
        owner = address(0);
    }

    function transferOwnership(address newOwner) public {
        require(isOwner());
        owner = newOwner;
    }
}

contract AlienCodex is Ownable {

    bool public contact;
    bytes32[] public codex;

    modifier contacted() {
        assert(contact);
        _;
    }
    
    function makeContact() public {
        contact = true;
    }

    function record(bytes32 _content) contacted public {
        codex.push(_content);
    }

    function retract() contacted public {
        codex.length--;
    }

    function revise(uint i, bytes32 _content) contacted public {
        console.log(i);
        codex[i] = _content;
    }
}